import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Table } from "flowbite-react";
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
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-surface glassmorphism gap-4 md:w-72 w-full rounded-xl shadow-md glow-border">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase font-display font-semibold">Total Users</h3>
              <p className="text-2xl text-text-primary">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-amber-500/20 text-amber-500 rounded-full text-5xl p-3 shadow-[0_0_15px_rgba(255,165,0,0.3)]" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-amber-500 flex items-center font-bold">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-surface glassmorphism gap-4 md:w-72 w-full rounded-xl shadow-md glow-border" style={{ borderColor: 'rgba(205, 179, 255, 0.3)' }}>
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase font-display font-semibold">
                Total Comments
              </h3>
              <p className="text-2xl text-text-primary">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-purple-500/20 text-purple-500 rounded-full text-5xl p-3 shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-purple-500 flex items-center font-bold">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 dark:bg-surface glassmorphism gap-4 md:w-72 w-full rounded-xl shadow-md glow-border" style={{ borderColor: 'rgba(56, 189, 248, 0.3)' }}>
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase font-display font-semibold">Total Posts</h3>
              <p className="text-2xl text-text-primary">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-steel-500/20 text-steel-500 rounded-full text-5xl p-3 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-steel-500 flex items-center font-bold">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2 rounded-xl dark:bg-surface border border-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2 font-display">Recent users</h1>
            <button className="btn-outline-amber px-4 py-1 rounded-lg">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-800 dark:bg-surface/50">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2 rounded-xl dark:bg-surface border border-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2 font-display">Recent comments</h1>
            <button className="btn-outline-amber px-4 py-1 rounded-lg">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-800 dark:bg-surface/50">
                    <Table.Cell className="w-96">
                      <p className="line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-[0_0_15px_rgba(0,0,0,0.5)] p-2 rounded-xl dark:bg-surface border border-gray-800">
          <div className="flex justify-between  p-3 text-sm font-semibold">
            <h1 className="text-center p-2 font-display">Recent posts</h1>
            <button className="btn-outline-amber px-4 py-1 rounded-lg">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-800 dark:bg-surface/50">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="user"
                        className="w-14 h-10 rounded-md bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell className="w-96">{post.title}</Table.Cell>
                    <Table.Cell className="w-5">{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
