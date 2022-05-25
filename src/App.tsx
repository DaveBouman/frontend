import { Button } from "@mui/material";
import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./components/context/userContext";
import Drawer from "./components/drawer";
import Admin from "./pages/admin";
import Entry from "./pages/entry";
import Home from "./pages/home";
import Profile from "./pages/profile";
import SignUp from "./pages/signUp";

function App() {
  return (
    <div className="App">
      <Drawer>
        <Routes>
          <Route
            path="/create"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                {/* <KweetForm /> */}
              </div>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Entry />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Drawer>
    </div>
  );
}

export default App;
