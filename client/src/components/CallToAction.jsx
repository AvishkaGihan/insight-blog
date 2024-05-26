import { Button } from "flowbite-react"; // Import Button component from Flowbite React library

// Main component for the Call to Action section
export default function CallToAction() {
  return (
    // Main container for the Call to Action section with styling
    <div className="flex flex-col sm:flex-row sm:gap-16 p-8 px-16 border-2 border-white  justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      {/* Text and button container */}
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-xl text-gray-200 font-semibold">
          Ready to dive deeper into JavaScript?
        </h2>
        {/* Section title */}
        <p className="text-xm text-gray-200 mb-8">
          Explore JavaScript tutorials at W3Schools.
        </p>

        <Button color="light" className="rounded-tl-xl rounded-bl-none">
          {/* Link inside the button */}
          <a
            href="https://www.w3schools.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Further
          </a>
        </Button>
      </div>

      {/* Image container */}
      <div className="p-7 flex-1">
        <img
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          alt="JavaScript Projects"
        />
      </div>
    </div>
  );
}
