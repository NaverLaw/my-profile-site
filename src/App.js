import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase";
import Login from "./components/Login";
import ProfileForm from "./components/ProfileForm";
import ProfileView from "./components/ProfileView";

function App() {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState({});

  // Load profiles from localStorage when the app starts
  useEffect(() => {
    const storedProfiles = localStorage.getItem("profiles");
    if (storedProfiles) {
      setProfiles(JSON.parse(storedProfiles));
    }
  }, []);

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/profile" /> : <Login />} />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileForm user={user} profiles={profiles} setProfiles={setProfiles} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/profile/:id"
          element={<ProfileView profiles={profiles} user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;