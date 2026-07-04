import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=4");
      const data = await res.json();
      setPosts(data.posts);
    };

    fetchPosts();
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background grid mesh and glowing radial gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white dark:from-[#0a0a0c]/20 dark:via-transparent dark:to-background pointer-events-none z-0"></div>
      
      {/* Primary Glowing Orbs */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Main content container (Hero Section) */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-64px)] relative z-10">
        
        {/* Left Column (Brand Slogan and Description) */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7 gap-6">
          {/* Spark Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)] animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Discover insight 2.0</span>
          </div>

          <h1 className="max-w-xl text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white font-display animate-fade-in">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-500 drop-shadow-[0_2px_20px_rgba(245,158,11,0.25)]">
              insight.
            </span>
          </h1>

          <p className="max-w-xl text-base md:text-lg text-gray-600 dark:text-text-muted font-normal leading-relaxed animate-slide-up">
            Unlock the world of web development with our expertly curated articles
            on JavaScript, React, and Next.js. Whether you&apos;re a beginner
            looking to grasp the basics or a seasoned developer aiming to stay
            ahead of the curve, Insight is your go-to resource for in-depth
            tutorials, practical tips, and the latest industry trends.
          </p>

          {/* Button CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full animate-slide-up" style={{ animationDelay: "0.15s" }}>
            <Link
              to="/search"
              className="inline-flex gap-2 items-center justify-center px-8 py-3 text-sm font-semibold text-center rounded-full btn-amber hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Articles
              <svg
                className="w-4 h-4 mt-[1px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex gap-2 items-center justify-center px-8 py-3 text-sm font-semibold text-center rounded-full btn-outline-amber hover:scale-105 active:scale-95 transition-all duration-300"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Right Column (Interactive Code Console & Floating Highlight Card) */}
        <div className="flex justify-center items-center lg:col-span-5 w-full relative lg:mt-0 mt-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          
          {/* Glowing back orb under code console */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-amber-500/20 to-purple-600/20 blur-[80px] pointer-events-none -z-10 animate-pulse"></div>

          {/* Code Editor Container */}
          <div className="w-full max-w-md bg-[#0d0e12]/90 border border-gray-200/10 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden font-mono text-xs text-left text-gray-300">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#08080b]/90 border-b border-gray-200/5 dark:border-white/5">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-[10px] text-gray-500 font-sans tracking-wide">insight.config.js</span>
              <div className="w-10"></div>
            </div>

            {/* Code Lines */}
            <div className="p-5 space-y-2 leading-relaxed overflow-x-auto selection:bg-amber-500/30 selection:text-white">
              <div>
                <span className="text-purple-400 font-semibold">const</span>{" "}
                <span className="text-blue-400">developer</span> = {"{"}
              </div>
              <div className="pl-4">
                <span className="text-gray-400">name:</span>{" "}
                <span className="text-green-400">&apos;You&apos;</span>,
              </div>
              <div className="pl-4">
                <span className="text-gray-400">skills:</span> [
                <span className="text-amber-400">&apos;React&apos;</span>,{" "}
                <span className="text-amber-400">&apos;Next.js&apos;</span>,{" "}
                <span className="text-amber-400">&apos;Tailwind&apos;</span>
                ],
              </div>
              <div className="pl-4">
                <span className="text-gray-400">passion:</span>{" "}
                <span className="text-green-400">&apos;Building Premium UI&apos;</span>
              </div>
              <div>{"};"}</div>
              <div className="pt-2">
                <span className="text-purple-400 font-semibold">function</span>{" "}
                <span className="text-yellow-400">elevateCoding</span>() {"{"}
              </div>
              <div className="pl-4">
                <span className="text-purple-400 font-semibold">return</span>{" "}
                <span className="text-amber-500 font-semibold">Insight</span>.
                <span className="text-blue-400">readArticles</span>()
              </div>
              <div className="pl-8">
                .
                <span className="text-blue-400">then</span>(() =&gt;{" "}
                <span className="text-yellow-400">buildFuture</span>());
              </div>
              <div>{"}"}</div>
            </div>
          </div>

          {/* Floating Trending Card Overlay */}
          <div className="absolute -bottom-6 -right-2 md:-right-6 bg-[#16171d]/95 border border-gray-200/10 dark:border-white/10 p-4 rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.4)] dark:shadow-[0_15px_30px_rgba(0,0,0,0.7)] backdrop-blur-md max-w-[220px] flex flex-col gap-2 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 pointer-events-auto">
            <span className="inline-flex self-start px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[9px] font-bold tracking-wider uppercase">
              Trending Now
            </span>
            <h4 className="text-xs font-semibold text-white font-display leading-snug line-clamp-2">
              Next.js 15: The New Era of Server Components
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-[9px] font-bold text-black select-none">
                IN
              </div>
              <span className="text-[10px] text-gray-400 font-sans">5 min read</span>
            </div>
          </div>
        </div>

      </div>

      {/* Call to Action section */}
      <div className="bg-gray-50/50 dark:bg-gradient-cyber border-y border-gray-200 dark:border-gray-800 relative z-10 transition-colors duration-300">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-10 dark:opacity-30"></div>
        <div className="container mx-auto md:px-16 sm:px-4 p-2 py-16 relative z-10">
          <CallToAction />
        </div>
      </div>

      {/* Posts section */}
      <div className="container mx-auto md:px-16 sm:px-4 p-2 flex flex-col gap-8 py-20 relative z-10">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-16">
            
            {/* Styled Section Title */}
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 className="text-3xl font-extrabold font-display dark:text-white tracking-tight">
                Recent Publications
              </h2>
              <p className="text-sm text-gray-500 dark:text-text-muted max-w-md">
                Stay up to date with the latest tutorials, insights, and coding patterns written by our experts.
              </p>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full mt-2"></div>
            </div>

            {/* Container for post cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Glowing Link to view all posts */}
            <Link
              to={"/search"}
              className="inline-flex self-center gap-2 items-center justify-center px-8 py-2.5 rounded-full border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              View all posts
              <svg className="w-4 h-4 mt-[1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

