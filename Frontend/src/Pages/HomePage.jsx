import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import HeaderActionsBar from "../Components/HeaderActionsBar";
import TopBox from "../Components/TopBox";
import Activities from "../Components/Activities";
import TopProducts from "../Components/TopProducts";
import AddProfile from "../Components/AddProfile";
import ProfilesList from "../Components/ProfilesList";
import BackendTest from "../Components/BackendTest";

const HomePage = ({ onLogout }) => {
  const [refreshProfiles, setRefreshProfiles] = useState(false);

  const handleProfileCreated = () => {
    setRefreshProfiles((prev) => !prev);
  };

  return (
    <>
      <div className="flex h-screen p-2 pt-1 font-sans bg-gray-100">
        <div className="mt-1">
          <NavBar />
        </div>

        <div className="flex-1 mt-5 flex flex-col">
          {/* Header Section with Actions Bar */}
          <div className="flex justify-between items-center p-4 ">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back,{" "}
                {JSON.parse(localStorage.getItem("user") || "{}").firstName ||
                  "User"}
                !
              </p>
            </div>
            <HeaderActionsBar onLogout={onLogout} />
          </div>
          <div className="flex m-2">
            <TopBox />
            <TopBox />
            <TopBox />
            <TopBox />
          </div>
          <Activities></Activities>
          <div className=" m-5 bg-gray-100 flex items-center ">
            <TopProducts />
            <AddProfile onProfileCreated={handleProfileCreated} />
          </div>

          {/* Profiles List */}
          <div className="mx-5 mb-5">
            <ProfilesList key={refreshProfiles} />
          </div>

          {/* Backend Connection Test */}
          {/* <div className="mx-5 mb-5">
            <BackendTest />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
