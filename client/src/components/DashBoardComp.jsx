import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  return (
    <div className="p-4 w-full flex flex-col gap-8 max-w-6xl mx-auto z-10 relative">
      
      {/* 1. Analytics Telemetry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        {/* Total Users */}
        <div className="flex flex-col p-6 bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md gap-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/5 hover:border-amber-500/30 hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)] transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-500 dark:text-text-muted text-xs uppercase font-extrabold tracking-wider select-none">Total Users</h3>
              <p className="text-3xl font-extrabold font-display text-gray-900 dark:text-white group-hover:text-amber-500 transition-colors duration-300">{totalUsers}</p>
            </div>
            <div className="bg-amber-500/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400 rounded-xl p-3 border border-amber-500/20 shadow-[0_4px_12px_rgba(245,158,11,0.08)]">
              <HiOutlineUserGroup className="text-2xl" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs select-none">
            <span className="text-amber-500 dark:text-amber-400 flex items-center font-extrabold gap-0.5">
              <HiArrowNarrowUp className="text-sm" />
              {lastMonthUsers}
            </span>
            <span className="text-gray-400 dark:text-text-muted font-medium">Last month</span>
          </div>
        </div>

        {/* Total Comments */}
        <div className="flex flex-col p-6 bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md gap-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/5 hover:border-purple-500/30 hover:shadow-[0_8px_30px_rgba(168,85,247,0.06)] transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-500 dark:text-text-muted text-xs uppercase font-extrabold tracking-wider select-none">Total Comments</h3>
              <p className="text-3xl font-extrabold font-display text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors duration-300">{totalComments}</p>
            </div>
            <div className="bg-purple-500/10 text-purple-500 dark:bg-purple-500/10 dark:text-purple-400 rounded-xl p-3 border border-purple-500/20 shadow-[0_4px_12px_rgba(168,85,247,0.08)]">
              <HiAnnotation className="text-2xl" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs select-none">
            <span className="text-purple-500 dark:text-purple-400 flex items-center font-extrabold gap-0.5">
              <HiArrowNarrowUp className="text-sm" />
              {lastMonthComments}
            </span>
            <span className="text-gray-400 dark:text-text-muted font-medium">Last month</span>
          </div>
        </div>

        {/* Total Posts */}
        <div className="flex flex-col p-6 bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md gap-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/5 hover:border-sky-500/30 hover:shadow-[0_8px_30px_rgba(56,189,248,0.06)] transition-all duration-300 group">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-500 dark:text-text-muted text-xs uppercase font-extrabold tracking-wider select-none">Total Posts</h3>
              <p className="text-3xl font-extrabold font-display text-gray-900 dark:text-white group-hover:text-sky-500 transition-colors duration-300">{totalPosts}</p>
            </div>
            <div className="bg-sky-500/10 text-sky-500 dark:bg-sky-500/10 dark:text-sky-400 rounded-xl p-3 border border-sky-500/20 shadow-[0_4px_12px_rgba(56,189,248,0.08)]">
              <HiDocumentText className="text-2xl" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs select-none">
            <span className="text-sky-500 dark:text-sky-400 flex items-center font-extrabold gap-0.5">
              <HiArrowNarrowUp className="text-sm" />
              {lastMonthPosts}
            </span>
            <span className="text-gray-400 dark:text-text-muted font-medium">Last month</span>
          </div>
        </div>
      </div>

      {/* 2. Recent Database Logs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* Recent Users Table Card */}
        <div className="flex flex-col bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/5 gap-4">
          <div className="flex justify-between items-center w-full pb-2 select-none">
            <h2 className="text-base font-extrabold font-display text-gray-900 dark:text-white">Recent Users</h2>
            <Link 
              to={"/dashboard?tab=users"}
              className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.05)] hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              See all
            </Link>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">User Image</th>
                  <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Username</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user._id} className="group border-b border-gray-100/50 dark:border-white/5 last:border-0 hover:bg-gray-500/5 dark:hover:bg-white/5 transition-all duration-200">
                      <td className="py-3">
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="w-8 h-8 rounded-full object-cover border border-gray-200/50 dark:border-white/10 shadow-sm"
                        />
                      </td>
                      <td className="py-3 text-sm text-gray-900 dark:text-gray-100 font-medium group-hover:text-amber-500 transition-colors duration-200">{user.username}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Comments Table Card */}
        <div className="flex flex-col bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/5 gap-4">
          <div className="flex justify-between items-center w-full pb-2 select-none">
            <h2 className="text-base font-extrabold font-display text-gray-900 dark:text-white">Recent Comments</h2>
            <Link 
              to={"/dashboard?tab=comments"}
              className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.05)] hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              See all
            </Link>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Comment Content</th>
                  <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Likes</th>
                </tr>
              </thead>
              <tbody>
                {comments &&
                  comments.map((comment) => (
                    <tr key={comment._id} className="group border-b border-gray-100/50 dark:border-white/5 last:border-0 hover:bg-gray-500/5 dark:hover:bg-white/5 transition-all duration-200">
                      <td className="py-3 pr-4 max-w-[200px]">
                        <p className="text-sm text-gray-900 dark:text-gray-100 line-clamp-2 leading-relaxed">{comment.content}</p>
                      </td>
                      <td className="py-3 text-sm text-gray-900 dark:text-gray-100 font-bold select-none">{comment.numberOfLikes}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Posts Table Card */}
        <div className="flex flex-col bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md p-6 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/5 gap-4">
          <div className="flex justify-between items-center w-full pb-2 select-none">
            <h2 className="text-base font-extrabold font-display text-gray-900 dark:text-white">Recent Posts</h2>
            <Link 
              to={"/dashboard?tab=posts"}
              className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.05)] hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
            >
              See all
            </Link>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Post Image</th>
                  <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Post Title</th>
                  <th className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted pb-3 border-b border-gray-200/50 dark:border-white/5">Category</th>
                </tr>
              </thead>
              <tbody>
                {posts &&
                  posts.map((post) => (
                    <tr key={post._id} className="group border-b border-gray-100/50 dark:border-white/5 last:border-0 hover:bg-gray-500/5 dark:hover:bg-white/5 transition-all duration-200">
                      <td className="py-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-12 h-8 rounded-lg object-cover border border-gray-200/50 dark:border-white/10 shadow-sm"
                        />
                      </td>
                      <td className="py-3 pr-2 max-w-[160px]">
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium group-hover:text-amber-500 transition-colors duration-200 line-clamp-2 leading-snug">{post.title}</p>
                      </td>
                      <td className="py-3 text-xs font-semibold text-amber-500 dark:text-amber-400 capitalize select-none">{post.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
