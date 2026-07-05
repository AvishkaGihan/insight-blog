import { Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: null,
  });
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
        } else {
          setFormData(data.posts[0]);
          setPublishError(null);
        }
      } catch (error) {
        console.log(error);
        setPublishError("Failed to fetch the post");
      }
    };

    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }

    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "-" + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData((prevData) => ({ ...prevData, image: downloadURL }));
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/post/updatepost/${formData._id}/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      setPublishError(null);
      navigate(`/post/${data.slug}`);
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden py-12 px-4 select-none">
      
      {/* Background Mesh and Radial Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" />
      
      {/* Glowing backlighting nodes */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-3xl mx-auto border border-amber-500/20 rounded-2xl bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col items-center gap-2 text-center mb-8">
          <h1 className="text-3xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
            Update{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
              Post
            </span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-text-muted font-bold tracking-wider uppercase">
            Edit publication title, category, media, or content
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          {/* Title and Category Dropdown */}
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <input
              type="text"
              placeholder="Post Title"
              required
              id="title"
              className="flex-1 w-full bg-white/40 dark:bg-[#121318]/50 border border-gray-200/80 dark:border-white/5 focus:border-amber-500/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all duration-300 shadow-sm"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
            <select
              className="w-full sm:w-56 bg-white/40 dark:bg-[#121318]/50 border border-gray-200/80 dark:border-white/5 focus:border-amber-500/30 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/10 transition-all duration-300 shadow-sm cursor-pointer"
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="uncategorized">Select a category</option>
              <option value="javascript">JavaScript</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
            </select>
          </div>

          {/* Interactive File Selector Box */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-2 border-amber-500/20 border-dashed p-4 rounded-xl bg-amber-500/[0.02] dark:bg-amber-500/[0.01] hover:bg-amber-500/[0.04] dark:hover:bg-amber-500/[0.02] transition-colors duration-300">
            <label className="flex flex-col flex-1 items-start cursor-pointer w-full sm:w-auto">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted mb-1">Feature Image</span>
              <span className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[200px] sm:max-w-xs font-semibold">
                {file ? file.name : "Choose post image..."}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
            </label>
            <button
              type="button"
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider rounded-xl border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.05)] disabled:opacity-50 flex items-center justify-center min-w-[120px]"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-6 h-6">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                    styles={{
                      path: { stroke: "#f59e0b" },
                      text: { fill: "#f59e0b", fontSize: "28px", fontWeight: "bold" },
                      trail: { stroke: "rgba(255, 255, 255, 0.1)" }
                    }}
                  />
                </div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>

          {/* Validation Alert */}
          {imageUploadError && (
            <Alert color="failure" className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-xs font-semibold">
              {imageUploadError}
            </Alert>
          )}

          {/* Post Feature Image Preview */}
          {formData.image && (
            <div className="relative group overflow-hidden rounded-xl border border-gray-200/50 dark:border-white/10 shadow-md">
              <img
                src={formData.image}
                alt="upload"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold font-display uppercase tracking-wider">Current Cover Image</span>
              </div>
            </div>
          )}

          {/* Styled Text Editor Wrapper */}
          <div className="border border-gray-200/80 dark:border-white/5 rounded-xl overflow-hidden focus-within:border-amber-500/30 transition-all duration-300 bg-white/30 dark:bg-[#121318]/30">
            <ReactQuill
              theme="snow"
              value={formData.content}
              placeholder="Write something..."
              className="h-72"
              required
              onChange={(value) => {
                setFormData((prevData) => ({ ...prevData, content: value }));
              }}
            />
          </div>

          {/* Bottom Spacing container for floating editor controls */}
          <div className="h-4 sm:h-2" />

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-black shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_25px_rgba(245,158,11,0.25)] transition-all duration-300 font-display"
          >
            Update post
          </button>

          {publishError && (
            <Alert color="failure" className="bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl text-xs font-semibold">
              {publishError}
            </Alert>
          )}

        </form>
      </div>
    </div>
  );
}
