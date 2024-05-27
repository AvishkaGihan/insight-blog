import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import logoLight from "../assets/logo-light-mode.png";
import logoDark from "../assets/logo-dark-mode.png";
import OAuth from "../components/OAuth.jsx";

// Main SignIn component definition
export default function SignIn() {
  // Access theme state from Redux store
  const { theme } = useSelector((state) => state.theme);

  // Local state for form data
  const [formData, setFormData] = useState({});

  // Access user state and dispatch from Redux
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle input changes and update formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex max-w-4xl justify-center mx-auto flex-col md:flex-row items-center gap-16">
        {/* Left section */}
        <div className="flex-1 flex flex-col items-center">
          <Link to="/">
            {/* Conditional rendering based on theme */}
            <img
              className={`h-20 ${theme === "dark" ? "visible" : "hidden"}`}
              src={logoDark}
              alt="logo"
            />
            <img
              className={`h-20 ${theme === "light" ? "visible" : "hidden"}`}
              src={logoLight}
              alt="logo"
            />
          </Link>
          <p className="text-sm mt-5 text-center">
            Discover the essence of web development. Explore our articles on
            JavaScript, React, and Next.js to ignite your coding passion and
            expand your horizons. Dive into Insight and transform your skills
            today.
          </p>
        </div>

        {/* Right section */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button color="success" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t Have an account?</span>
            <Link to="/sign-up" className="text-green-600">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
