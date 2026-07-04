import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoLight from "../assets/logo-light-mode.png";
import logoDark from "../assets/logo-dark-mode.png";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-background relative overflow-hidden transition-colors duration-300 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background grid mesh and glowing radial gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>
      
      {/* Soft backlighting */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>

      <div className="flex max-w-4xl w-full justify-between mx-auto flex-col md:flex-row items-stretch gap-12 p-4 md:p-8 relative z-10 animate-fade-in">
        
        {/* Left section: Onboarding Info */}
        <div className="flex-1 flex flex-col justify-center items-start gap-6 pr-0 md:pr-8">
          <Link to="/">
            <img
              className="h-12 w-auto dark:hidden"
              src={logoLight}
              alt="Insight Logo"
            />
            <img
              className="h-12 w-auto hidden dark:block"
              src={logoDark}
              alt="Insight Logo"
            />
          </Link>
          <div className="flex flex-col gap-3 text-left">
            <h1 className="text-3xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
              Join the developer{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-500 dark:to-yellow-400 drop-shadow-[0_2px_15px_rgba(245,158,11,0.15)]">
                community.
              </span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-text-muted leading-relaxed">
              Create an account to explore tested source code, write technical notes, bookmark framework guides, and connect with other developers.
            </p>
          </div>

          {/* Onboarding Highlights checklist */}
          <ul className="flex flex-col gap-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 mt-4 select-none">
            <li className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Access 30+ premium guides and tutorials</span>
            </li>
            <li className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Save custom config notes & code templates</span>
            </li>
            <li className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span>Join developer threads & discussions</span>
            </li>
          </ul>
        </div>

        {/* Right section: Signup Form */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full border border-amber-500/20 p-6 md:p-8 rounded-2xl">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              
              <div className="flex flex-col">
                <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted mb-1.5 select-none" htmlFor="username">
                  Your username
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted mb-1.5 select-none" htmlFor="email">
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-xs font-extrabold uppercase tracking-wider text-gray-500 dark:text-text-muted mb-1.5 select-none" htmlFor="password">
                  Your password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  id="password"
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200/60 dark:border-white/10 bg-white/50 dark:bg-black/30 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all duration-200 text-sm"
                  required
                />
              </div>

              <button
                className="w-full btn-amber py-2.5 rounded-xl text-sm font-semibold flex justify-center items-center hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>

              {/* OAuth component */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200/50 dark:border-white/5"></div>
                <span className="flex-shrink mx-4 text-gray-400 dark:text-gray-600 text-xs font-bold uppercase select-none">Or</span>
                <div className="flex-grow border-t border-gray-200/50 dark:border-white/5"></div>
              </div>

              <OAuth />
            </form>

            <div className="flex gap-1.5 text-xs font-semibold justify-center mt-5">
              <span className="text-gray-500 dark:text-text-muted">Have an account?</span>
              <Link to="/sign-in" className="text-amber-600 hover:text-amber-500 dark:text-amber-500 dark:hover:text-amber-400 transition-colors duration-150">
                Sign In
              </Link>
            </div>

            {/* Custom Error Alerts */}
            {errorMessage && (
              <div className="mt-4 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-semibold flex items-center gap-2 leading-relaxed">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
