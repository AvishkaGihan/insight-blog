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
    <footer className="w-full relative z-10 bg-gray-50/70 dark:bg-[#060608] border-t border-gray-200/50 dark:border-gray-900/60 py-12 md:py-16 transition-colors duration-300">
      {/* Top signature gold accent bar */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-10 border-b border-gray-200/50 dark:border-white/5">
          
          {/* Logo & Description Column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <Link to="/" className="inline-block">
              <img
                className="h-10 w-auto dark:hidden"
                src={logoLight}
                alt="Insight Logo"
              />
              <img
                className="h-10 w-auto hidden dark:block"
                src={logoDark}
                alt="Insight Logo"
              />
            </Link>
            <p className="text-sm text-gray-500 dark:text-text-muted max-w-sm leading-relaxed">
              Code beyond boundaries. Master modern web development technologies through in-depth tutorials, practical coding guides, and curated developer insights.
            </p>
          </div>

          {/* Links Columns Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Company */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-display select-none">
                Company
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link to="/about" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Brand Assets
                  </a>
                </li>
                <li>
                  <Link to="/search" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Blog Posts
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources */}
            <div className="flex flex-col gap-3">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-display select-none">
                Resources
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link to="/search" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/search?searchTerm=javascript" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-display select-none">
                Legal
              </h3>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-500 hover:text-amber-500 dark:text-text-muted dark:hover:text-amber-400 transition-colors duration-200">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Section Copyright & Social Icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-text-muted select-none">
            &copy; {new Date().getFullYear()} Insight. All rights reserved.
          </p>
          
          <div className="flex gap-5">
            <a
              href="#"
              className="text-gray-400 dark:text-text-muted hover:text-[#1877f2] dark:hover:text-[#1877f2] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.5)] transition-all duration-300"
              aria-label="Facebook"
            >
              <BsFacebook className="text-lg" />
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-text-muted hover:text-[#e1306c] dark:hover:text-[#e1306c] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.5)] transition-all duration-300"
              aria-label="Instagram"
            >
              <BsInstagram className="text-lg" />
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-text-muted hover:text-[#1da1f2] dark:hover:text-[#1da1f2] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(29,161,242,0.5)] transition-all duration-300"
              aria-label="Twitter"
            >
              <BsTwitter className="text-lg" />
            </a>
            <a
              href="https://github.com/AvishkaGihan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-text-muted hover:text-gray-900 dark:hover:text-white hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-300"
              aria-label="GitHub"
            >
              <BsGithub className="text-lg" />
            </a>
            <a
              href="#"
              className="text-gray-400 dark:text-text-muted hover:text-[#ea4c89] dark:hover:text-[#ea4c89] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(234,76,137,0.5)] transition-all duration-300"
              aria-label="Dribbble"
            >
              <BsDribbble className="text-lg" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
