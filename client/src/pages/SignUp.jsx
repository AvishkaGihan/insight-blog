import { useState } from "react"; // Importing useState hook from React for managing local component state.
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from react-router-dom for navigation and linking.
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"; // Importing various components from flowbite-react for UI elements.
import { useSelector } from "react-redux"; // Importing useSelector from react-redux to access the Redux state.

import logoLight from "../assets/logo-light-mode.png"; // Importing the light mode logo image.
import logoDark from "../assets/logo-dark-mode.png"; // Importing the dark mode logo image.

import OAuth from "../components/OAuth"; // Importing the OAuth component for social login options.

export default function SignUp() {
  // Defining the SignUp functional component.
  const { theme } = useSelector((state) => state.theme); // Accessing the theme state from the Redux store.
  const [formData, setFormData] = useState({}); // Local state for form data, initialized as an empty object.
  const [errorMessage, setErrorMessage] = useState(null); // Local state for error messages, initialized as null.
  const [loading, setLoading] = useState(false); // Local state to track the loading state, initialized as false.

  const navigate = useNavigate(); // useNavigate hook to programmatically navigate to different routes.

  const handleChange = (e) => {
    // Handler function to update formData state when form inputs change.
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); // Updating the formData state by setting the input value based on the input's id.
  };

  const handleSubmit = async (e) => {
    // Handler function for form submission.
    e.preventDefault(); // Prevent the default form submission behavior.
    if (!formData.username || !formData.email || !formData.password) {
      // Check if any of the required fields are empty.
      return setErrorMessage("Please fill out all fields."); // Set an error message if any required field is empty.
    }
    try {
      setLoading(true); // Set the loading state to true to show the loading spinner.
      setErrorMessage(null); // Clear any previous error messages.
      const res = await fetch("api/auth/signup", {
        // Make an API call to the signup endpoint.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending the formData in the request body.
      });
      const data = await res.json(); // Parsing the response as JSON.
      if (data.success === false) {
        // Check if the response indicates a failure.
        setLoading(false); // Stop the loading state.
        return setErrorMessage(data.message); // Set the error message from the response.
      }
      setLoading(false); // Stop the loading state.
      if (res.ok) {
        // Check if the response status is OK (200-299).
        navigate("/sign-in"); // Navigate to the sign-in page upon successful signup.
      }
    } catch (error) {
      // Catch any errors that occur during the API call.
      setErrorMessage(error.message); // Set the error message to the error's message.
      setLoading(false); // Stop the loading state.
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {/* Container div with minimum height and top margin */}
      <div className="flex max-w-4xl justify-center mx-auto flex-col md:flex-row items-center gap-16">
        {/* Main content container with flexbox layout */}

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
            {" "}
            {/* Form with flex layout and gap between elements */}
            <div>
              <Label value="Your username" /> {/* Label for username input */}
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange} // Setting the onChange handler for username input
              />
            </div>
            <div>
              <Label value="Your email" /> {/* Label for email input */}
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange} // Setting the onChange handler for email input
              />
            </div>
            <div>
              <Label value="Your password" /> {/* Label for password input */}
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange} // Setting the onChange handler for password input
              />
            </div>
            <Button
              type="submit"
              color="success"
              disabled={loading} // Disabling the button if loading is true
            >
              {loading ? ( // Conditional rendering based on loading state
                <>
                  <Spinner size="sm" /> {/* Spinner component */}
                  <span className="pl-3">Loading...</span> {/* Loading text */}
                </>
              ) : (
                "Sign Up" // Button text when not loading
              )}
            </Button>
            <OAuth /> {/* OAuth component for social login options */}
          </form>
          <div className="flex gap-2 text-sm mt-5">
            {" "}
            {/* Link to the sign-in page */}
            <span>Have an Account</span>
            <Link to="/sign-in" className="text-green-500">
              Sign In
            </Link>
          </div>
          {errorMessage && ( // Conditionally rendering the Alert component if there's an error message
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
