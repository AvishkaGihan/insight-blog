import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import CallToAction from "../components/CallToAction"; // Import CallToAction component
import { useEffect, useState } from "react"; // Import useEffect and useState hooks from React
import PostCard from "../components/PostCard"; // Import PostCard component

// Main component for the Home page
export default function Home() {
  // State to hold the posts
  const [posts, setPosts] = useState([]);

  // useEffect hook to fetch posts when the component mounts
  useEffect(() => {
    // Function to fetch posts from the API
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=4"); // Fetch posts from the API endpoint
      const data = await res.json(); // Parse the JSON response
      setPosts(data.posts); // Update the state with the fetched posts
    };

    fetchPosts(); // Call the fetchPosts function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {/* Main content container */}
      <div className="container lg:px-16 md:px-8 sm:px-4 p-2 mx-auto flex flex-col gap-4 justify-center items-center text-center min-h-screen">
        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
          Welcome to insight.
        </h1>
        <p className="max-w-2xl mb-6 font-light text-gray-600 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-300  ">
          Unlock the world of web development with our expertly curated articles
          on JavaScript, React, and Next.js. Whether you&apos;re a beginner
          looking to grasp the basics or a seasoned developer aiming to stay
          ahead of the curve, Insight is your go-to resource for in-depth
          tutorials, practical tips, and the latest industry trends. Dive in and
          elevate your coding journey today!
        </p>
        <Link
          to="/search"
          className="inline-flex gap-1 items-center justify-center px-16 py-4 text-base font-medium text-center rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 shadow-md"
        >
          View all posts
          <svg
            className="w-5 h-5 mt-[4px]"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>

      {/* Call to Action section */}
      <div className="bg-green-600">
        <div className="container mx-auto  md:px-16 sm:px-4 p-2 py-16 ">
          <CallToAction />
        </div>
      </div>

      {/* Posts section */}
      <div className="container mx-auto md:px-16 sm:px-4 p-2 flex flex-col gap-8 py-16">
        {/* Check if there are posts to display */}
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-16">
            {/* Section title */}
            <h2 className="text-3xl font-semibold text-center">Recent Posts</h2>

            {/* Container for post cards */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-8 justify-items-center">
              {/* Loop through each post and render a PostCard component */}
              {posts.map((post) => (
                <PostCard key={post._id} post={post} /> // Each post card needs a unique key, which is post._id
              ))}
            </div>

            {/* Link to view all posts */}
            <Link
              to={"/search"}
              className="text-lg text-green-600 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
