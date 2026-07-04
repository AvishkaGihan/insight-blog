import { Alert, Modal } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  } from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      () => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for image to upload");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        dispatch(deleteUserFailure(res.message));
      } else {
        dispatch(deleteUserSuccess());
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

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
    <div className="max-w-xl mx-auto p-4 w-full flex flex-col items-stretch z-10 relative">
      {/* Title block */}
      <div className="flex flex-col items-center gap-2 text-center mb-8">
        <h1 className="text-3xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
          Profile{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
            Settings
          </span>
        </h1>
        <p className="text-xs text-gray-500 dark:text-text-muted font-bold tracking-wider uppercase">
          Customize your credentials & details
        </p>
      </div>

      <div className="w-full border border-amber-500/20 p-6 md:p-8 rounded-2xl bg-white/50 dark:bg-[#0d0e12]/60 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.02)] dark:shadow-[0_15px_40px_rgba(0,0,0,0.15)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
          />

          {/* Profile Picture */}
          <div
            className="w-32 h-32 self-center cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] overflow-hidden rounded-full border-2 border-amber-500 relative group transition-all duration-300"
            onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
              <CircularProgressbar
                value={imageFileUploadProgress || 0}
                text={`${imageFileUploadProgress}%`}
                strokeWidth={5}
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 30,
                  },
                  path: {
                    stroke: `rgba(245, 158, 11, ${
                      imageFileUploadProgress / 100
                    })`,
                  },
                }}
              />
            )}
            <img
              src={imageFileUrl || currentUser.profilePicture}
              alt="user"
              className={`rounded-full w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                "opacity-60"
              }`}
            />
            {/* Edit Photo Overlay */}
            <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none text-white z-20">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-500">Edit Photo</span>
            </div>
          </div>

          {imageFileUploadError && (
            <Alert color="failure" className="rounded-xl">{imageFileUploadError}</Alert>
          )}

          {/* Username Input */}
          <div className="flex flex-col">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted mb-1.5 select-none" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm"
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted mb-1.5 select-none" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted mb-1.5 select-none" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="mt-2 btn-amber py-2.5 rounded-xl text-sm w-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)]"
            disabled={loading || imageFileUploading}
          >
            {loading ? "Saving settings..." : "Update Profile"}
          </button>

          {currentUser.isAdmin && (
            <Link to={"/create-post"} className="w-full">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black font-bold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]"
              >
                Create a post
              </button>
            </Link>
          )}
        </form>

        {/* Danger zone actions */}
        <div className="flex justify-between items-center text-xs mt-6 pt-6 border-t border-gray-200/50 dark:border-white/5">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-red-500 hover:text-red-600 font-bold transition-colors select-none"
          >
            Delete Account
          </button>
          <button
            type="button"
            onClick={handleSignout}
            className="text-gray-500 hover:text-amber-500 font-bold transition-colors select-none"
          >
            Sign Out
          </button>
        </div>
      </div>

      {updateUserSuccess && (
        <Alert color="success" className="rounded-xl mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="rounded-xl mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="rounded-xl mt-5">
          {error}
        </Alert>
      )}

      {/* Account Deletion Modal */}
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
              Are you sure you want to delete your account? This action is permanent and cannot be undone.
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteUser}
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
