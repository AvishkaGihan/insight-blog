import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import logoLight from "../assets/logo-light-mode.png";
import logoDark from "../assets/logo-dark-mode.png";

export default function FooterCom() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <Footer
      container
      className="rounded-none border-t border-gray-800 bg-surface relative z-10"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-amber-500 via-steel-500 to-purple-500"></div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white"
            >
              <img
                className={`h-12 ${theme === "dark" ? "visible" : "hidden"}`}
                src={logoDark}
                alt="logo"
              />
              <img
                className={`h-12 ${theme === "light" ? "visible" : "hidden"}`}
                src={logoLight}
                alt="logo"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Company" />
              <Footer.LinkGroup col={true}>
                <Footer.Link href="#">About</Footer.Link>
                <Footer.Link href="#">Careers</Footer.Link>
                <Footer.Link href="#">Brand Center</Footer.Link>
                <Footer.Link href="#">Blog</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Resources" />
              <Footer.LinkGroup col={true}>
                <Footer.Link href="#">Documentation</Footer.Link>
                <Footer.Link href="#">Tutorials</Footer.Link>
                <Footer.Link href="#">Community</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="insight."
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} className="hover:text-amber-500 hover:drop-shadow-[0_0_8px_rgba(255,165,0,0.8)] transition-all" />
            <Footer.Icon href="#" icon={BsInstagram} className="hover:text-amber-500 hover:drop-shadow-[0_0_8px_rgba(255,165,0,0.8)] transition-all" />
            <Footer.Icon href="#" icon={BsTwitter} className="hover:text-amber-500 hover:drop-shadow-[0_0_8px_rgba(255,165,0,0.8)] transition-all" />
            <Footer.Icon
              href="https://github.com/AvishkaGihan"
              icon={BsGithub}
              className="hover:text-amber-500 hover:drop-shadow-[0_0_8px_rgba(255,165,0,0.8)] transition-all"
            />
            <Footer.Icon href="#" icon={BsDribbble} className="hover:text-amber-500 hover:drop-shadow-[0_0_8px_rgba(255,165,0,0.8)] transition-all" />
          </div>
        </div>
      </div>
    </Footer>
  );
}
