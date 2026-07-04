import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (
      (searchTermFromUrl && searchTermFromUrl !== sidebarData.searchTerm) ||
      (sortFromUrl && sortFromUrl !== sidebarData.sort) ||
      (categoryFromUrl && categoryFromUrl !== sidebarData.category)
    ) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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

  return (
    <div className="min-h-screen bg-white dark:bg-background relative overflow-hidden transition-colors duration-300 flex flex-col md:flex-row">
      {/* Background grid mesh and glowing radial gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      {/* Soft backlighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>

      {/* Sidebar container */}
      <div className="p-8 md:border-r border-gray-200/50 dark:border-white/5 bg-transparent md:w-3/12 z-10 relative">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          {/* Search Term */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted select-none" htmlFor="searchTerm">
              Search Term
            </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm"
            />
          </div>

          {/* Sort Order */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted select-none" htmlFor="sort">
              Sort Order
            </label>
            <div className="relative">
              <select
                id="sort"
                value={sidebarData.sort}
                onChange={handleChange}
                className="appearance-none w-full px-4 py-2.5 rounded-xl border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm cursor-pointer pr-10"
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted select-none" htmlFor="category">
              Category
            </label>
            <div className="relative">
              <select
                id="category"
                value={sidebarData.category}
                onChange={handleChange}
                className="appearance-none w-full px-4 py-2.5 rounded-xl border border-gray-200/50 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm cursor-pointer pr-10"
              >
                <option value="uncategorized">Uncategorized</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">Next.js</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button className="mt-4 btn-amber py-2.5 rounded-xl text-sm w-full font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]" type="submit">
            Apply Filters
          </button>
        </form>
      </div>

      {/* Main content container */}
      <div className="w-full p-8 md:p-12 z-10 relative">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full border-b border-gray-200/50 dark:border-white/5 pb-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
              Search{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
                results
              </span>
            </h1>
            <p className="text-xs text-gray-500 dark:text-text-muted font-bold tracking-wider mt-1 uppercase">
              {!loading && `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} found`}
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 justify-items-center">
          {!loading && posts.length === 0 && (
            <p className="text-lg text-gray-500 font-semibold col-span-full py-12">No posts found matching your criteria.</p>
          )}
          {loading && (
            <div className="col-span-full py-12 flex justify-center items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-500 font-semibold">Fetching articles...</span>
            </div>
          )}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>

        {showMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleShowMore}
              className="text-amber-500 text-sm font-bold tracking-wider hover:text-amber-400 py-3 px-8 rounded-xl border border-amber-500/20 hover:border-amber-500/40 bg-amber-500/5 hover:bg-amber-500/10 transition-all duration-300 uppercase shadow-sm"
            >
              Show More Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
