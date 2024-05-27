// Import necessary components and hooks from external libraries
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

// Define the Search component as the default export
export default function Search() {
  // Define state variables to manage search/filter criteria and posts data
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Get the current location and navigation objects from React Router
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect hook to handle side effects, such as fetching posts when the component mounts or location/search criteria change
  useEffect(() => {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    // Update sidebarData state if query parameters exist in the URL
    if (
      (searchTermFromUrl && searchTermFromUrl !== sidebarData.searchTerm) ||
      (sortFromUrl && sortFromUrl !== sidebarData.sort) ||
      (categoryFromUrl && categoryFromUrl !== sidebarData.category)
    ) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    // Function to fetch posts data from the server
    const fetchPosts = async () => {
      setLoading(true); // Set loading state to true
      const searchQuery = urlParams.toString(); // Convert URL parameters to string
      const res = await fetch(`/api/post/getposts?${searchQuery}`); // Fetch posts from API
      if (!res.ok) {
        setLoading(false); // Set loading state to false if request fails
        return;
      }
      if (res.ok) {
        const data = await res.json(); // Parse response JSON
        setPosts(data.posts); // Update posts state
        setLoading(false); // Set loading state to false
        if (data.posts.length === 9) {
          setShowMore(true); // Show "Show More" button if there are more posts to load
        } else {
          setShowMore(false); // Hide "Show More" button if there are no more posts to load
        }
      }
    };
    fetchPosts(); // Call the fetchPosts function
  }, [location.search, sidebarData]); // Depend on location.search and sidebarData

  // Event handler to update sidebarData state when input values change
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  // Event handler to handle form submission and update URL with search criteria
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  // Event handler to load more posts when "Show More" button is clicked
  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  // Return the JSX to render the Search component
  return (
    // Main container with responsive flex layout: column on small screens, row on medium and larger screens
    <div className="flex flex-col md:flex-row">
      {/* Sidebar container with padding, bottom border on small screens, right border on medium and larger screens, and minimum height on medium and larger screens */}
      <div className="p-8 md:border-r md:min-h-screen border-gray-200 md:w-3/12">
        {/* Form to handle search and filter inputs, with vertical spacing between elements and onSubmit handler */}
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* Container for search term input */}
          <div className="flex flex-col items-start gap-1">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            {/* TextInput for entering search term, controlled by sidebarData state */}
            <TextInput
              className="w-full"
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          {/* Container for sort option select */}
          <div className="flex flex-col items-start gap-1">
            <label className="font-semibold">Sort:</label>
            {/* Select input for choosing sort order, controlled by sidebarData state */}
            <Select
              className="w-full"
              onChange={handleChange}
              value={sidebarData.sort}
              id="sort"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          {/* Container for category select */}
          <div className="flex flex-col items-start gap-1">
            <label className="font-semibold">Category:</label>
            {/* Select input for choosing category, controlled by sidebarData state */}
            <Select
              className="w-full"
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
          {/* Button to submit the form and apply filters */}
          <Button className="mt-4" type="submit" color="success" outline>
            Apply Filters
          </Button>
        </form>
      </div>

      {/* Main content container for displaying posts */}
      <div className="w-full">
        {/* Header for posts results */}
        {/* Container for posts with padding and flex layout for wrapping posts */}
        <div className="py-8 px-16 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-8 gap-4 justify-items-center">
          <h1 className="text-3xl font-semibold col-span-3">Posts results:</h1>

          {/* Conditional rendering: message if no posts found and not loading */}
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}
          {/* Conditional rendering: loading message */}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {/* Conditional rendering: map through posts and display each with PostCard component */}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {/* Conditional rendering: Show More button if there are more posts to load */}
        </div>
        {showMore && (
          <button
            onClick={handleShowMore}
            className="text-blue-500 text-lg hover:underline p-7 w-full"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}
