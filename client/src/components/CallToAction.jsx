

// Main component for the Call to Action section
export default function CallToAction() {
  return (
    // Main container for the Call to Action section with styling
    <div className="flex flex-col sm:flex-row sm:gap-16 p-8 px-16 glow-border justify-center items-center rounded-tl-3xl rounded-br-3xl text-center glassmorphism relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-purple-500/5 pointer-events-none"></div>
      {/* Text and button container */}
      <div className="flex-1 justify-center flex flex-col relative z-10">
        <h2 className="text-2xl text-text-primary font-semibold font-display">
          Ready to dive deeper into JavaScript?
        </h2>
        {/* Section title */}
        <p className="text-text-muted mb-8 mt-2">
          Explore JavaScript tutorials at W3Schools.
        </p>

        <a
          href="https://www.w3schools.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-amber py-3 px-6 rounded-tl-xl rounded-br-xl rounded-tr-none rounded-bl-none text-center"
        >
          Explore Further
        </a>
      </div>

      {/* Image container */}
      <div className="p-7 flex-1 relative z-10">
        <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] group">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
          <img
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
            alt="JavaScript Projects"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
}
