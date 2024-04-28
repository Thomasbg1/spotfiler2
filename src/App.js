import { useEffect, useState } from "react";
import {
  getPlaybackState,
  getTopTracks,
  getUserData,
} from "./services/spotify.js";
import Home from "./pages/Home.js";
import Statistiques from "./pages/Statistiques.js";
import Profile from "./pages/Profile.js";
import { Routes, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState();
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    getUserData().then(setUser);
    getTopTracks().then((tracks) => setTracks(tracks));
    getPlaybackState().then(({ is_playing }) => setPlaying(is_playing));
  }, []);

  console.log(playing);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Statistiques />} />
      <Route path="/profil" element={<Profile />} />
    </Routes>
  );
}

export default App;
