import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 flex flex-col items-stretch z-10 relative">
      {/* Title Block */}
      <div className="flex flex-col items-center gap-2 text-center mb-8 select-none">
        <h1 className="text-3xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
          Manage{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
            Comments
          </span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-text-muted font-bold tracking-wider uppercase">
          Moderation list and user discussions logs
        </p>
      </div>

      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <div className="w-full border border-amber-500/20 p-6 rounded-2xl bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Date updated</th>
                    <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Comment content</th>
                    <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Number of likes</th>
                    <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">PostId</th>
                    <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">UserId</th>
                    <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment) => (
                    <tr key={comment._id} className="group border-b border-gray-100/50 dark:border-white/5 last:border-0 hover:bg-gray-500/5 dark:hover:bg-white/5 transition-all duration-200">
                      <td className="py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 font-sans">
                        {new Date(comment.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 max-w-sm">
                        <p className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed">{comment.content}</p>
                      </td>
                      <td className="py-4 text-sm text-gray-900 dark:text-gray-100 font-bold select-none">
                        {comment.numberOfLikes}
                      </td>
                      <td className="py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 font-sans max-w-[120px] truncate">
                        {comment.postId}
                      </td>
                      <td className="py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 font-sans max-w-[120px] truncate">
                        {comment.userId}
                      </td>
                      <td className="py-4">
                        <button
                          type="button"
                          onClick={() => {
                            setShowModal(true);
                            setCommentIdToDelete(comment._id);
                          }}
                          className="text-red-500 hover:text-red-600 font-bold text-xs uppercase tracking-wider transition-colors select-none"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-center mt-6 py-3 text-xs font-extrabold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors hover:underline select-none"
            >
              Show more comments
            </button>
          )}
        </>
      ) : (
        <div className="text-center p-12 border border-gray-200/40 dark:border-white/5 rounded-2xl bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md">
          <p className="text-gray-500 dark:text-text-muted font-bold text-sm select-none">You have no comments yet!</p>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body className="bg-white dark:bg-background rounded-b-2xl border-none">
          <div className="text-center p-4">
            <HiOutlineExclamationCircle className="h-14 w-14 text-amber-500 mb-4 mx-auto" />
            <h3 className="mb-5 text-base font-medium text-gray-900 dark:text-white leading-relaxed">
              Are you sure you want to delete this comment? This action is permanent and cannot be undone.
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteComment}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_4px_12px_rgba(239,68,68,0.15)]"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
