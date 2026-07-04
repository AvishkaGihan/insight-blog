import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  // Calculate estimated reading time
  const readTime = post.content 
    ? Math.max(1, Math.ceil(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200)) 
    : 3;

  return (
    <div className="group relative w-full max-w-md h-[400px] flex flex-col overflow-hidden rounded-2xl border border-gray-200/50 dark:border-white/10 hover:border-amber-500/50 hover:shadow-[0_12px_40px_rgba(245,158,11,0.08)] bg-white dark:bg-[#0d0e12]/80 transition-all hover:scale-[1.02] duration-300">
      
      {/* Cover Image Link */}
      <Link to={`/post/${post.slug}`} className="block relative h-[210px] w-full overflow-hidden rounded-t-2xl z-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
        <img
          src={post.image}
          alt="post cover"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Floating Category Badge */}
        <span className="absolute bottom-3 left-3 z-30 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-black/75 text-amber-500 border border-amber-500/30 backdrop-blur-md select-none">
          {post.category}
        </span>
      </Link>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 h-[190px] relative z-30">
        {/* Date and Read Time Row */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-text-muted mb-2 font-sans select-none">
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
          <span>{readTime} min read</span>
        </div>

        {/* Post Title */}
        <Link to={`/post/${post.slug}`}>
          <h3 className="text-base md:text-lg font-bold font-display leading-snug line-clamp-2 text-gray-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
            {post.title}
          </h3>
        </Link>

        {/* Footer Action Anchor */}
        <Link
          to={`/post/${post.slug}`}
          className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5 w-full select-none"
        >
          <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors duration-300">
            Read Article
          </span>
          <svg
            className="w-4 h-4 text-gray-400 dark:text-text-muted group-hover:text-amber-500 dark:group-hover:text-amber-400 group-hover:translate-x-1.5 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
