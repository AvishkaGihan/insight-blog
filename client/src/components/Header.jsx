import { Dropdown } from "flowbite-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/40 dark:border-gray-800/80 bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md transition-all duration-300">
      {/* Top signature golden accent gradient bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* BRAND / LOGO (Left) */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-wide">
            <img className="h-8 w-auto dark:hidden" src={logoLight} alt="Insight Logo" />
            <img className="h-8 w-auto hidden dark:block" src={logoDark} alt="Insight Logo" />
          </Link>
        </div>

        {/* NAVIGATION LINKS (Center - Desktop only) */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              path === "/"
                ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                : "text-gray-600 dark:text-gray-300 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              path === "/about"
                ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                : "text-gray-600 dark:text-gray-300 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            About
          </Link>
          <Link
            to="/projects"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              path === "/projects"
                ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                : "text-gray-600 dark:text-gray-300 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            Projects
          </Link>
        </nav>

        {/* ACTIONS (Right) */}
        <div className="flex items-center gap-3">
          
          {/* SEARCH INPUT (Desktop Only) */}
          <form onSubmit={handleSubmit} className="hidden lg:block relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-40 lg:w-48 focus:w-60 h-9 pl-9 pr-3 rounded-full text-xs bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 ease-in-out"
            />
            <AiOutlineSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          </form>

          {/* SEARCH ICON (Mobile/Tablet Only - navigates directly to search page) */}
          <button
            onClick={() => navigate('/search')}
            className="lg:hidden p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-amber-500 dark:hover:text-amber-400 transition-all"
            title="Search"
          >
            <AiOutlineSearch className="text-xl" />
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-amber-500 dark:hover:text-amber-400 hover:scale-105 active:scale-95 transition-all duration-300"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <FaSun className="text-amber-500 animate-pulse" />
            ) : (
              <FaMoon className="text-amber-400" />
            )}
          </button>

          {/* USER ACTIONS / SIGN IN */}
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="relative group p-0.5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 hover:shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-all duration-300">
                  <img
                    alt="user"
                    src={currentUser.profilePicture}
                    className="h-8 w-8 rounded-full object-cover border border-white dark:border-[#0a0a0c]"
                  />
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                  @{currentUser.username}
                </span>
                <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to="/dashboard?tab=profile">
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <button className="btn-amber px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                Sign In
              </button>
            </Link>
          )}

          {/* HAMBURGER TOGGLE (Mobile Only) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-[#0a0a0c]/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800/80 px-4 py-4 flex flex-col gap-3 shadow-xl transition-all duration-300 animate-slide-up z-40">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              path === "/"
                ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              path === "/about"
                ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            About
          </Link>
          <Link
            to="/projects"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              path === "/projects"
                ? "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
            }`}
          >
            Projects
          </Link>
        </div>
      )}
    </header>
  );
}

