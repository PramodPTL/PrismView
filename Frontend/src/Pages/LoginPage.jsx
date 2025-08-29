import React from "react";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaDiscord,
  FaGoogle,
  FaApple,
} from "react-icons/fa";

const LoginPage = () => {
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
            <button className="border-0.2 px-4 py-2 rounded bg-white hover:bg-gray-200">
              <div className="flex ">
                <div className=" py-1">
                  <FaGoogle />
                </div>
                <p className=" forced-colors:block px-3">Sign in with Google</p>
              </div>
            </button>
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
            <form className="flex flex-col gap-4">
              <h3>Email address</h3>
              <input
                type="email"
                placeholder="Enter your Mail here"
                defaultValue=" "
                className="border px-4 py-2 rounded"
              />
              <h3>Password</h3>
              <input
                type="password"
                placeholder="Password"
                className="border px-4 py-2 rounded"
              />
              <div className="text-left text-sm text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </div>
              <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Sign In
              </button>
            </form>
          </div>

          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
