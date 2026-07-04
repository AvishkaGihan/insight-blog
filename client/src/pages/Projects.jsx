import { FiGithub, FiExternalLink, FiLayers, FiBarChart2, FiShoppingCart, FiCpu } from "react-icons/fi";
import CallToAction from "../components/CallToAction";

export default function Projects() {
  const projectsList = [
    {
      title: "AI Analytics Dashboard",
      description: "A high-performance SaaS analytics suite integrating real-time telemetry pipelines, interactive charting models, and stream-based AI notifications.",
      category: ["Next.js 15", "Tailwind CSS", "Recharts"],
      gradient: "from-indigo-600 to-violet-500",
      demoUrl: "#",
      githubUrl: "https://github.com/AvishkaGihan",
      icon: <FiBarChart2 className="text-3xl text-indigo-400" />,
      illustration: (
        <div className="w-full h-full flex flex-col justify-end p-4 bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border-b border-indigo-500/20">
          <div className="flex gap-2 items-end justify-between h-24 px-4 pb-2 border-b border-white/5">
            <div className="w-6 h-12 rounded-t bg-indigo-500 group-hover:h-16 transition-all duration-500"></div>
            <div className="w-6 h-16 rounded-t bg-indigo-400 group-hover:h-20 transition-all duration-500"></div>
            <div className="w-6 h-8 rounded-t bg-indigo-500 group-hover:h-12 transition-all duration-500"></div>
            <div className="w-6 h-20 rounded-t bg-indigo-300 group-hover:h-24 transition-all duration-500"></div>
            <div className="w-6 h-14 rounded-t bg-indigo-400 group-hover:h-18 transition-all duration-500"></div>
          </div>
        </div>
      )
    },
    {
      title: "DocuEngine Markdown Docs",
      description: "Fast, search-optimized technical documentation system leveraging static compilation, MDX layouts, and flexible dark-mode code rendering blocks.",
      category: ["React", "MDX", "Algolia"],
      gradient: "from-emerald-600 to-teal-500",
      demoUrl: "#",
      githubUrl: "https://github.com/AvishkaGihan",
      icon: <FiLayers className="text-3xl text-emerald-400" />,
      illustration: (
        <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 border-b border-emerald-500/20">
          <div className="w-full max-w-[200px] bg-black/40 border border-white/10 rounded-lg p-3 font-mono text-[10px] text-emerald-400 flex flex-col gap-1.5 shadow-lg group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center border-b border-white/5 pb-1 select-none text-[8px] text-gray-500">
              <span>insight.config.mdx</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500/40"></span>
            </div>
            <div>const meta = {"{"}</div>
            <div className="pl-3 text-white">title: &apos;Insight App&apos;,</div>
            <div className="pl-3 text-emerald-300">version: &apos;15.2.0&apos;</div>
            <div>{"}"};</div>
          </div>
        </div>
      )
    },
    {
      title: "Interactive Dev Portfolio",
      description: "A fast, content-driven developer landing page configuration featuring interactive widgets, CSS mesh overlays, and structured article highlights.",
      category: ["React", "Vite", "Tailwind"],
      gradient: "from-amber-600 to-yellow-500",
      demoUrl: "#",
      githubUrl: "https://github.com/AvishkaGihan",
      icon: <FiCpu className="text-3xl text-amber-400" />,
      illustration: (
        <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-amber-900/40 to-yellow-900/40 border-b border-amber-500/20">
          <div className="flex gap-4 items-center bg-black/40 border border-white/10 p-4 rounded-xl shadow-lg w-full max-w-[220px] group-hover:scale-105 transition-transform duration-500">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center font-bold text-black text-xs select-none">
              IN
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="w-20 h-2 bg-white/20 rounded"></div>
              <div className="w-12 h-1.5 bg-amber-500/30 rounded"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Stripe E-Commerce Platform",
      description: "A secure, animated storefront design with fluid card transition checkouts, cart logic integrations, and automated shipping metrics panels.",
      category: ["Next.js", "Stripe", "Framer"],
      gradient: "from-rose-600 to-red-500",
      demoUrl: "#",
      githubUrl: "https://github.com/AvishkaGihan",
      icon: <FiShoppingCart className="text-3xl text-rose-400" />,
      illustration: (
        <div className="w-full h-full flex items-center justify-center p-6 bg-gradient-to-br from-rose-900/40 to-red-900/40 border-b border-rose-500/20">
          <div className="relative bg-black/40 border border-white/10 p-4 rounded-xl shadow-lg w-full max-w-[200px] flex flex-col gap-2 group-hover:scale-105 transition-transform duration-500">
            <div className="flex justify-between items-center text-[10px] text-rose-400 font-bold">
              <span>Checkout Success</span>
              <FiShoppingCart />
            </div>
            <div className="w-full h-2.5 bg-rose-500/10 rounded overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-rose-500 to-red-400 rounded"></div>
            </div>
            <span className="text-[9px] text-gray-400 select-none">$149.00 USD Paid</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-background relative overflow-hidden transition-colors duration-300 py-16 md:py-24">
      {/* Background grid mesh and glowing radial gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      {/* Soft backlighting */}
      <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 dark:bg-amber-500/10 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-[150px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Hero Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6 select-none animate-pulse">
            ✨ Projects Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight text-gray-900 dark:text-white mb-6">
            Featured Web Development{"            "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
              Templates.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-text-muted leading-relaxed">
            Build fun, engaging, and production-ready applications while learning HTML, CSS, and modern framework ecosystems.
          </p>
        </div>

        {/* Section 2: Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20 md:mb-28">
          {projectsList.map((project, index) => (
            <div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/50 dark:border-white/10 hover:border-amber-500/50 hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)] bg-white dark:bg-[#0d0e12]/80 transition-all hover:scale-[1.01] duration-300"
            >
              {/* Illustration Header */}
              <div className="relative h-[180px] w-full overflow-hidden rounded-t-2xl z-20 flex justify-center items-center">
                {project.illustration}
                {/* Overlay Icon */}
                <div className="absolute top-4 right-4 z-30 p-2.5 rounded-xl bg-white dark:bg-[#16171d]/90 shadow-md border border-gray-200/20 dark:border-white/5 flex items-center justify-center">
                  {project.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category badges */}
                  <div className="flex gap-2 flex-wrap mb-4 select-none">
                    {project.category.map((cat, cIndex) => (
                      <span
                        key={cIndex}
                        className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-text-muted border border-gray-200/30 dark:border-white/5"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-text-muted mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Card CTA Actions */}
                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
                  <a
                    href={project.demoUrl}
                    className="inline-flex gap-1.5 items-center px-4 py-2 text-xs font-semibold rounded-full btn-amber hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.1)] hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  >
                    View Demo
                    <FiExternalLink className="text-[10px]" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex gap-1.5 items-center px-4 py-2 text-xs font-semibold rounded-full btn-outline-amber hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    Source Code
                    <FiGithub className="text-[10px]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner section */}
        <div className="border-t border-gray-200/50 dark:border-white/5 pt-12 md:pt-16">
          <CallToAction />
        </div>

      </div>
    </div>
  );
}
