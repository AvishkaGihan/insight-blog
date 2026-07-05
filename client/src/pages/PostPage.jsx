import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);

  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );

  return (
    <main className="min-h-screen relative overflow-hidden py-12 px-4 select-none animate-fade-in">
      
      {/* Background Mesh and Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.04] pointer-events-none z-0" />
      
      {/* Glowing ambient nodes */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Article Title */}
        <h1 className="text-3xl mt-6 text-center font-display font-extrabold max-w-3xl mx-auto lg:text-5xl text-gray-900 dark:text-white leading-tight">
          {post && post.title}
        </h1>

        {/* Categorized and Telemetry Badges */}
        <div className="flex flex-wrap gap-2 justify-center items-center mt-6 select-none">
          <Link to={`/search?category=${post && post.category}`}>
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 dark:border-amber-500/30 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.05)] cursor-pointer">
              {post && post.category}
            </span>
          </Link>
          <span className="bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-text-muted border border-gray-200/30 dark:border-white/5 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider">
            {post && new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider italic">
            {post && (post.content.length / 1000).toFixed(0)} min read
          </span>
        </div>

        {/* Feature Image Wrapper */}
        <div className="mt-10 w-full relative group rounded-2xl overflow-hidden border border-gray-200/50 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:border-amber-500/30 transition-all duration-300 bg-white/50 dark:bg-[#0d0e12]/60">
          <img
            src={post && post.image}
            alt={post && post.title}
            className="max-h-[550px] w-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Reading Separator Line */}
        <div className="w-full max-w-3xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent my-10" />

        {/* Rich-Text Post Content */}
        <div
          className="max-w-3xl mx-auto w-full post-content px-4 text-gray-800 dark:text-gray-200 leading-relaxed font-serif"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>

        {/* separator */}
        <div className="w-full max-w-3xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent my-10" />

        {/* Integrated Comment Section */}
        <CommentSection postId={post && post._id} />

        {/* Recent Articles Gallery grid */}
        <div className="flex flex-col justify-center items-center mb-10 mt-20 border-t border-gray-200/50 dark:border-white/5 pt-12">
          <h2 className="text-2xl font-extrabold font-display text-gray-900 dark:text-white mb-8 tracking-tight">
            Recent{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400">
              Articles
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-center">
            {recentPosts &&
              recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>

      </div>
    </main>
  );
}
