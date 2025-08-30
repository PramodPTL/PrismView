import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { googleSignIn } from "../services/api";

const GoogleSignIn = ({ onSuccess, onError }) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // Send the access token to your backend
        const result = await googleSignIn(response.access_token);
        if (result.success) {
          // Store user data and token
          localStorage.setItem("token", result.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: result.data.id,
              firstName: result.data.firstName,
              lastName: result.data.lastName,
              email: result.data.email,
              picture: result.data.picture,
              isGoogleUser: true,
            })
          );

          onSuccess(result.data);
        } else {
          onError(result.message || "Google sign-in failed");
        }
      } catch (error) {
        console.error("Google sign-in error:", error);
        onError("Failed to authenticate with Google");
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      onError("Google sign-in failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="border-0.2 px-4 py-2 rounded bg-white hover:bg-gray-200 transition-colors flex items-center gap-2"
    >
      <FaGoogle className="text-red-500" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleSignIn;
