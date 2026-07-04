import { Link } from "react-router-dom";
import javascriptCtaImage from "../assets/javascript_cta.png";

export default function CallToAction() {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 py-8 justify-between items-center w-full bg-transparent relative z-10">
      {/* Text and checklist container */}
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <h2 className="text-3xl md:text-4xl text-gray-900 dark:text-white font-extrabold font-display leading-tight">
          Ready to dive deeper into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
            JavaScript?
          </span>
        </h2>
        <p className="text-base text-gray-600 dark:text-text-muted mt-3 mb-6 max-w-lg">
          Explore hand-crafted coding tutorials, master modern JS frameworks, and build interactive projects.
        </p>

        {/* bulleted highlights list */}
        <ul className="flex flex-col gap-3 text-left text-sm text-gray-700 dark:text-gray-300 mb-8 self-center md:self-start">
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span>ES6+ Essentials & Asynchronous JavaScript</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span>React Component States & Hook Life Cycles</span>
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span>Next.js 15 SSR & Router Optimization</span>
          </li>
        </ul>

        {/* CTA Button */}
        <Link
          to="/search?searchTerm=javascript"
          className="inline-flex gap-2 items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full btn-amber hover:scale-105 active:scale-95 transition-all duration-300 self-center md:self-start shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
        >
          Explore Tutorials
          <svg className="w-5 h-5 mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Graphic illustration container */}
      <div className="flex-1 w-full max-w-sm md:max-w-md relative flex justify-center items-center z-10 md:mt-0 mt-8">
        {/* Soft background pulse orb */}
        <div className="absolute w-48 h-48 rounded-full bg-amber-500/10 dark:bg-amber-500/20 blur-[60px] pointer-events-none -z-10 animate-pulse"></div>

        {/* Hover-effect framed image */}
        <div className="relative rounded-2xl overflow-hidden border border-gray-200/10 dark:border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 group select-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
          <img
            src={javascriptCtaImage}
            alt="Premium JavaScript Graphic"
            className="w-full h-auto object-cover max-h-[200px] md:max-h-[260px]"
          />
        </div>
      </div>
    </div>
  );
}


