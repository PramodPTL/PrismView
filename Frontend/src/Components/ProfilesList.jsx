import React, { useState, useEffect } from "react";
import { getProfiles, deleteProfile } from "../services/api";
import { Trash2, Edit, User, RefreshCw } from "lucide-react";

export default function ProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await getProfiles();
      if (response.success) {
        setProfiles(response.data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        const response = await deleteProfile(id);
        if (response.success) {
          setProfiles(profiles.filter(profile => profile.id !== id));
          alert("Profile deleted successfully!");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading profiles...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <div className="text-red-600 text-center">
          Error: {error}
        </div>
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6 w-full">
        <div className="text-center text-gray-500">
          <User size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium">No profiles yet</p>
          <p className="text-sm">Create your first profile to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Your Profiles</h3>
        <button
          onClick={fetchProfiles}
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh profiles"
          disabled={loading}
        >
          <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="font-semibold text-lg text-gray-800">
                  {profile.name}
                </h4>
                <p className="text-gray-600 text-sm">{profile.email}</p>
                <p className="text-gray-600 text-sm">{profile.phone}</p>
                <div className="flex gap-4 mt-2">
                  {profile.instagram && (
                    <a
                      href={profile.instagram.startsWith('http') ? profile.instagram : `https://${profile.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Instagram
                    </a>
                  )}
                  {profile.youtube && (
                    <a
                      href={profile.youtube.startsWith('http') ? profile.youtube : `https://${profile.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      YouTube
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Created: {new Date(profile.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete profile"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
