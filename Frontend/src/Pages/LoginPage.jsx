import React, { useState } from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaDiscord,
  FaGoogle,
  FaApple,
} from "react-icons/fa";
import SignUpPopup from "../Components/SignUpPopup";
import GoogleSignIn from "../Components/GoogleSignIn";
import { loginUser } from "../services/api";

const LoginPage = ({ onLogin }) => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser(loginData);
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          })
        );

        // Redirect to home page or dashboard
        console.log("Login successful:", response.data);
        // Call the onLogin callback to update authentication state
        onLogin();
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (userData) => {
    console.log("Google sign-in successful:", userData);
    onLogin();
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100 ">
      {/* Left Section */}
      <div className="w-1/3 h-screen bg-[#5f5bf6] text-white flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-15 h-15 bg-white rounded-full absolute top-8 left-8"></div>
          </div>
          <h1 className="text-4xl font-bold mb-6">PRISMVIEW</h1>
          <div className="flex absolute bottom-8 justify-center gap-6 text-2xl">
            <FaGithub />
            <FaTwitter />
            <FaLinkedin />
            <FaDiscord />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center ">
        <div className="w-3/4 max-w-md">
          <h2 className="text-2xl font-bold mb-2">Sign In</h2>
          <p className="mb-6 text-gray-600">Sign in to your account</p>

          <div className="flex gap-3 mb-6">
            <GoogleSignIn
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
            <button className="border-0.2 px-4 py-2 rounded bg-white hover:bg-gray-200">
              <div className="flex ">
                <div className=" py-1">
                  <FaApple />
                </div>
                <p className=" forced-colors:block px-3">Sign in with Apple</p>
              </div>
            </button>
          </div>

          <div className="bg-amber-30 bg-white p-7 rounded-2xl">
            {/* Error Message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <h3>Email address</h3>
              <input
                type="email"
                placeholder="Enter your Mail here"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="border px-4 py-2 rounded"
                required
              />
              <h3>Password</h3>
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="border px-4 py-2 rounded"
                required
              />
              <div className="text-left text-sm text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`py-2 rounded ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={openSignUp}
            >
              Register here
            </span>
          </p>
        </div>
      </div>

      {/* SignUp Popup */}
      <SignUpPopup isOpen={isSignUpOpen} onClose={closeSignUp} />
    </div>
  );
};

export default LoginPage;
