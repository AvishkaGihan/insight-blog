import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex p-5 border border-gray-100 dark:border-white/5 bg-white/40 dark:bg-[#0d0e12]/40 hover:border-amber-500/20 backdrop-blur-md text-sm mb-3 rounded-2xl transition-all duration-300">
      
      {/* User Avatar */}
      <div className="flex-shrink-0 mr-4">
        <img
          className="w-9 h-9 rounded-full bg-gray-200 object-cover shadow-sm border border-gray-100 dark:border-white/5"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>

      <div className="flex-1">
        {/* Comment Metadata */}
        <div className="flex items-center mb-2">
          <span className="font-extrabold mr-2 text-xs text-gray-900 dark:text-white truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-[10px] text-gray-400 dark:text-text-muted font-semibold">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>

        {/* Comment Content or Edit Textarea */}
        {isEditing ? (
          <>
            <textarea
              className="w-full bg-white/40 dark:bg-[#121318]/50 border border-gray-200/80 dark:border-white/5 focus:border-amber-500/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all duration-300 shadow-sm resize-none mb-3"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows="3"
            />
            <div className="flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-black rounded-lg transition-all duration-300 shadow-md"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-extrabold uppercase tracking-wider border border-gray-200 dark:border-white/10 text-gray-500 dark:text-text-muted rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-600 dark:text-gray-300 pb-3 leading-relaxed">
              {comment.content}
            </p>
            
            {/* Interactive Comment Actions */}
            <div className="flex items-center pt-3 border-t border-gray-100 dark:border-white/5 mt-1 gap-3 font-semibold text-gray-400 dark:text-text-muted select-none">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`flex items-center gap-1.5 transition-colors duration-200 ${
                  currentUser && comment.likes.includes(currentUser._id)
                    ? "text-amber-500"
                    : "text-gray-400 hover:text-amber-500"
                }`}
              >
                <FaThumbsUp className="text-xs" />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  {comment.numberOfLikes > 0
                    ? `${comment.numberOfLikes} ${comment.numberOfLikes === 1 ? "like" : "likes"}`
                    : "Like"}
                </span>
              </button>
              
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-amber-500 transition-colors duration-200 font-bold uppercase text-[9px] tracking-wider"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(comment._id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 font-bold uppercase text-[9px] tracking-wider"
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
