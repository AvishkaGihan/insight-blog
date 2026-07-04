import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="group relative w-full border border-gray-800 hover:glow-border h-[370px] overflow-hidden rounded-lg sm:w-[320px] transition-all glassmorphism hover:scale-[1.02] duration-300">
      <Link to={`/post/${post.slug}`} className="block relative h-[240px] group-hover:h-[200px] transition-all duration-300 z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
        <img
          src={post.image}
          alt="post cover"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="p-3 px-8 md:px-4 flex flex-col gap-2 relative z-30">
        <p className="text-lg font-semibold line-clamp-2 font-display">{post.title}</p>
        <span className="italic text-sm text-text-muted">{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 transition-all duration-300 my-4 mx-4"
        >
          <button className="w-full btn-outline-amber py-2 rounded-lg text-sm">
            Read article
          </button>
        </Link>
      </div>
    </div>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
