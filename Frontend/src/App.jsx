import { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import AddProfilePopup from "./Components/AddProfilePopup";


function App() {
  return (
    <>
      <LoginPage />
      <HomePage />
      <AddProfilePopup/>
    </>
  );
}

export default App;
