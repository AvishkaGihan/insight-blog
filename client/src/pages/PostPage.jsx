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
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen animate-fade-in relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>
      <h1 className="text-3xl mt-10 p-3 text-center font-display font-bold max-w-2xl mx-auto lg:text-5xl text-text-primary">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <span className="bg-amber-500/20 text-amber-500 border border-amber-500/50 px-4 py-1 rounded-full text-sm hover:bg-amber-500 hover:text-black transition-colors shadow-[0_0_10px_rgba(255,165,0,0.2)]">
          {post && post.category}
        </span>
      </Link>
      <div className="mt-10 p-3 w-full relative group">
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none z-10"></div>
        <img
          src={post && post.image}
          alt={post && post.title}
          className="max-h-[600px] w-full object-cover rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-gray-800"
        />
      </div>
      <div className="flex justify-between p-3 border-b border-gray-800 mx-auto w-full max-w-2xl text-xs text-text-muted mt-5">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic text-amber-500/80">
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>

      <CommentSection postId={post._id} />
      <div className="flex flex-col justify-center items-center mb-5 mt-10">
        <h1 className="text-2xl mt-5 font-display text-text-primary">Recent articles</h1>
        <div className="flex flex-wrap gap-5 mt-8 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
