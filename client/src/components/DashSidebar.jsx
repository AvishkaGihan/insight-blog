import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { signOutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DashSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(`/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200/50 dark:border-white/5 bg-gray-50/30 dark:bg-[#090a0d]/40 flex flex-col p-4 z-10 relative">
      <div className="flex flex-col gap-1.5 w-full mt-4">
        {currentUser && currentUser.isAdmin && (
          <Link
            to="/dashboard?tab=dash"
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              tab === "dash" || !tab
                ? "text-amber-500 bg-amber-500/10 border border-amber-500/20 shadow-[0_4px_12px_rgba(245,158,11,0.05)]"
                : "text-gray-600 dark:text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
            }`}
          >
            <HiChartPie className="text-lg shrink-0" />
            <span>Dashboard</span>
          </Link>
        )}

        <Link
          to="/dashboard?tab=profile"
          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
            tab === "profile"
              ? "text-amber-500 bg-amber-500/10 border border-amber-500/20 shadow-[0_4px_12px_rgba(245,158,11,0.05)]"
              : "text-gray-600 dark:text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
          }`}
        >
          <HiUser className="text-lg shrink-0" />
          <span className="flex-1">Profile</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/10">
            {currentUser.isAdmin ? "Admin" : "User"}
          </span>
        </Link>

        {currentUser && currentUser.isAdmin && (
          <>
            <Link
              to="/dashboard?tab=posts"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                tab === "posts"
                  ? "text-amber-500 bg-amber-500/10 border border-amber-500/20 shadow-[0_4px_12px_rgba(245,158,11,0.05)]"
                  : "text-gray-600 dark:text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
              }`}
            >
              <HiDocumentText className="text-lg shrink-0" />
              <span>Posts</span>
            </Link>

            <Link
              to="/dashboard?tab=users"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                tab === "users"
                  ? "text-amber-500 bg-amber-500/10 border border-amber-500/20 shadow-[0_4px_12px_rgba(245,158,11,0.05)]"
                  : "text-gray-600 dark:text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
              }`}
            >
              <HiOutlineUserGroup className="text-lg shrink-0" />
              <span>Users</span>
            </Link>

            <Link
              to="/dashboard?tab=comments"
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                tab === "comments"
                  ? "text-amber-500 bg-amber-500/10 border border-amber-500/20 shadow-[0_4px_12px_rgba(245,158,11,0.05)]"
                  : "text-gray-600 dark:text-gray-400 hover:text-amber-500 hover:bg-gray-100 dark:hover:bg-white/5 border border-transparent"
              }`}
            >
              <HiAnnotation className="text-lg shrink-0" />
              <span>Comments</span>
            </Link>
          </>
        )}

        <button
          onClick={handleSignout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/5 dark:hover:bg-red-500/10 border border-transparent transition-all duration-300 text-left w-full mt-2"
        >
          <HiArrowSmRight className="text-lg shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
