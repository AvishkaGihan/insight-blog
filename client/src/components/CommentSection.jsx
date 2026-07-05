import { Alert, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import PropTypes from "prop-types";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editedContent } : c
      )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await res.json();
        setComments(comments.filter((comment) => comment._id !== commentId));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-4 relative z-10">
      
      {/* Session Info Bar */}
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-500 dark:text-text-muted text-xs font-bold uppercase tracking-wider select-none">
          <span>Signed in as:</span>
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/5 py-1 px-3 rounded-full">
            <img
              className="h-4 w-4 object-cover rounded-full bg-gray-200"
              src={currentUser.profilePicture}
              alt=""
            />
            <Link
              to={"/dashboard?tab=profile"}
              className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline lowercase font-bold"
            >
              @{currentUser.username}
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-xs text-purple-600 dark:text-purple-400 border border-purple-500/20 bg-purple-500/[0.02] p-4 rounded-xl my-6 flex items-center gap-1.5 font-bold uppercase tracking-wider justify-center select-none">
          <span>You must be signed in to comment.</span>
          <Link className="text-amber-500 hover:underline ml-1" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}

      {/* Comment Input Box */}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-amber-500/20 hover:border-amber-500/30 transition-colors duration-300 rounded-2xl p-5 bg-white/40 dark:bg-[#0d0e12]/60 backdrop-blur-md shadow-sm"
        >
          <textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className="w-full bg-white/40 dark:bg-[#121318]/50 border border-gray-200/80 dark:border-white/5 focus:border-amber-500/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all duration-300 shadow-sm resize-none"
          />
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-400 dark:text-text-muted text-xs font-semibold">
              {200 - comment.length} characters remaining
            </p>
            <button
              type="submit"
              className="btn-amber px-5 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300"
            >
              Submit
            </button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-xs font-semibold">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {/* Comments List Header */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-text-muted my-8 font-semibold text-center py-6 border border-dashed border-gray-200 dark:border-white/5 rounded-2xl">
          No comments yet! Be the first to share your thoughts.
        </p>
      ) : (
        <>
          <div className="text-sm my-6 flex items-center gap-2 font-bold tracking-tight text-gray-900 dark:text-white">
            <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-text-muted">Comments</span>
            <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-xs font-extrabold shadow-sm">
              {comments.length}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                onLike={handleLike}
                onEdit={handleEdit}
                onDelete={(commentId) => {
                  setShowModal(true);
                  setCommentToDelete(commentId);
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Delete Comment Modal Overrides */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header className="dark:bg-[#0d0e12] border-b-0" />
        <Modal.Body className="dark:bg-[#0d0e12]">
          <div className="text-center p-4">
            <HiOutlineExclamationCircle className="h-14 w-14 text-amber-500 mb-4 mx-auto" />
            <h3 className="mb-6 text-sm font-semibold text-gray-500 dark:text-text-muted uppercase tracking-wider">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(commentToDelete)}
                className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors duration-300 shadow-md"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-text-muted hover:bg-gray-100 dark:hover:bg-white/5 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired,
};
