import { useState } from "react";
import "./App.css";
import AuthMain from "./components/Auth/AuthMain";
import DashboardMain from "./components/Dashboard/DashboardMain";
import MainScreen from "./components/Form/MainScreen";

function App() {
  // ? state for role
  const [role, setRole] = useState("login");

  return (
    <div>
      {role === "login" && <AuthMain setRole={setRole}></AuthMain>}

      {role === "moderator" && <MainScreen></MainScreen>}
      {role === "admin" && <DashboardMain></DashboardMain>}
    </div>
  );
}

export default App;

// ? main

// <UploadImage></UploadImage>
// <StudentForm></StudentForm>
