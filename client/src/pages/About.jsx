import { Link } from "react-router-dom";
import { FiBookOpen, FiUsers, FiCode, FiZap } from "react-icons/fi";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-background relative overflow-hidden transition-colors duration-300 py-16 md:py-24">
      {/* Background grid mesh and glowing radial gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      {/* Soft backlighting */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[150px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Hero Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6 select-none animate-pulse">
            ✨ Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight text-gray-900 dark:text-white mb-6">
            Empowering developers to build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
              beyond boundaries.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-text-muted leading-relaxed">
            Welcome to Insight, your premier source for mastering modern web technologies. We design hand-crafted coding tutorials, masterclasses, and coding guides to elevate your developer skillset.
          </p>
        </div>

        {/* Section 2: Metrics / Statistics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20 md:mb-28">
          
          <div className="flex flex-col items-center p-6 rounded-2xl border border-gray-200/60 dark:border-white/5 bg-gray-50/50 dark:bg-[#0d0e12]/40 backdrop-blur-sm select-none hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 font-display">
              30+
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-text-muted mt-2">
              Premium Tutorials
            </span>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl border border-gray-200/60 dark:border-white/5 bg-gray-50/50 dark:bg-[#0d0e12]/40 backdrop-blur-sm select-none hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 font-display">
              5k+
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-text-muted mt-2">
              Monthly Readers
            </span>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl border border-gray-200/60 dark:border-white/5 bg-gray-50/50 dark:bg-[#0d0e12]/40 backdrop-blur-sm select-none hover:-translate-y-1 transition-all duration-300">
            <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 font-display">
              99.9%
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-text-muted mt-2">
              Tested Source Code
            </span>
          </div>

        </div>

        {/* Section 3: Core Philosophy Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-gray-200/50 dark:border-white/5 mb-16 md:mb-24">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
              Why we build and write for Insight.
            </h2>
            <p className="text-base text-gray-600 dark:text-text-muted leading-relaxed">
              Technology evolves rapidly. Our philosophy centers on helping developers make sense of complicated tooling without getting bogged down by details.
            </p>
          </div>

          {/* Right Column: Values grid */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Value 1 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50/10 border border-amber-50/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <FiZap className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 font-display">
                  Continuous Growth
                </h3>
                <p className="text-sm text-gray-600 dark:text-text-muted leading-relaxed">
                  We believe in the power of continuous learning and staying updated in the fast-paced landscape of web development.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50/10 border border-amber-50/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <FiCode className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 font-display">
                  Production-Ready Quality
                </h3>
                <p className="text-sm text-gray-600 dark:text-text-muted leading-relaxed">
                  Our team of experienced developers work tirelessly to bring you thoroughly researched tutorials, verified tips, and deep framework insights.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50/10 border border-amber-50/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <FiUsers className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 font-display">
                  Community Nurtured
                </h3>
                <p className="text-sm text-gray-600 dark:text-text-muted leading-relaxed">
                  Our goal is to foster an inclusive community where code tips and project builds are shared freely, encouraging technical curiosity.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: Call-to-Action Footer */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white mb-4">
            Ready to explore?
          </h2>
          <p className="text-sm text-gray-600 dark:text-text-muted mb-8 max-w-md">
            Start diving into our hand-crafted blog posts and master your next development stack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/search"
              className="inline-flex gap-2 items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full btn-amber hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              Explore Tutorials
              <FiBookOpen className="text-sm" />
            </Link>
            <a
              href="https://github.com/AvishkaGihan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2 items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-full btn-outline-amber hover:scale-105 active:scale-95 transition-all duration-300"
            >
              GitHub Project
              <FiCode className="text-sm" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
