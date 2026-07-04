import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import logoLight from "../assets/logo-light-mode.png";
import logoDark from "../assets/logo-dark-mode.png";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className="md:!px-16 sm:!px-2 py-4 border-b border-gray-800 dark:border-amber-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(255,165,0,0.1)] bg-white/70 dark:bg-background/80 backdrop-blur-md w-[100%] sticky top-0 z-50">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-bold font-display dark:text-white"
      >
        <img
          className={`h-10 ${theme === "dark" ? "visible" : "hidden"}`}
          src={logoDark}
          alt="logo"
        />
        <img
          className={`h-10 ${theme === "light" ? "visible" : "hidden"}`}
          src={logoLight}
          alt="logo"
        />
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          color="gray"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          outline
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun className="text-amber-500" /> : <FaMoon className="text-steel-500" />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <button className="btn-amber px-4 py-2 rounded-lg">Sign In</button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/" className={`font-medium ${path === "/" ? "text-amber-500 dark:text-amber-500" : "hover:text-amber-500 dark:hover:text-amber-500 transition-colors"}`}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about" className={`font-medium ${path === "/about" ? "text-amber-500 dark:text-amber-500" : "hover:text-amber-500 dark:hover:text-amber-500 transition-colors"}`}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects" className={`font-medium ${path === "/projects" ? "text-amber-500 dark:text-amber-500" : "hover:text-amber-500 dark:hover:text-amber-500 transition-colors"}`}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
