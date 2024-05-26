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
      const res = await fetch("/api/post/getPosts"); // Fetch posts from the API endpoint
      const data = await res.json(); // Parse the JSON response
      setPosts(data.posts); // Update the state with the fetched posts
    };

    fetchPosts(); // Call the fetchPosts function
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div>
      {/* Main content container */}
      <div className="container mx-auto px-28 py-36 flex flex-col gap-4 justify-center items-center text-center">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to Insight</h1>
        <p className="text-gray-500 text-xs sm:text-sm max-w-xl">
          Unlock the world of web development with our expertly curated articles
          on JavaScript, React, and Next.js. Whether you&apos;re a beginner
          looking to grasp the basics or a seasoned developer aiming to stay
          ahead of the curve, Insight is your go-to resource for in-depth
          tutorials, practical tips, and the latest industry trends. Dive in and
          elevate your coding journey today!
        </p>
        <Link
          to="/search"
          className="mt-8 text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts
        </Link>
      </div>

      {/* Call to Action section */}
      <div className="container mx-auto px-28 py-16 bg-teal-500 ">
        <CallToAction />
      </div>

      {/* Posts section */}
      <div className="container mx-auto p-28 flex flex-col gap-8 py-16">
        {/* Check if there are posts to display */}
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            {/* Section title */}
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>

            {/* Container for post cards */}
            <div className="flex flex-wrap gap-4 justify-center">
              {/* Loop through each post and render a PostCard component */}
              {posts.map((post) => (
                <PostCard key={post._id} post={post} /> // Each post card needs a unique key, which is post._id
              ))}
            </div>

            {/* Link to view all posts */}
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
