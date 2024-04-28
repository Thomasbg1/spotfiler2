import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Data from "../components/Data";
import { loginSpotify, isLogged } from "../services/spotify"; // Import your Spotify service functions

const defaultTheme = createTheme();
const sections = [
  { title: "Accueil", url: "/" },
  { title: "Statistiques", url: "/stats" },
  { title: "Profil", url: "/profil" },
];

function Statistiques() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setToken(accessToken);
    } else {
      // Token not found, user is not logged in
      // Redirect user to Spotify login or show a login button
      loginSpotify(); // Call your Spotify service function to log in
    }
  }, []);

  // If token is null, show a loading state or a message to log in
  if (!token) {
    return <div>Loading... Please log in to Spotify to continue.</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Spotiflier" sections={sections} />
        <div>
          <h1>Statistiques</h1>
          <p>Découvrez vos genres et artistes favoris !</p>
        </div>
        <Data token={token} />
      </Container>
      <Footer
        title="Crédits"
        description="Thomas Legay - Elouarn Le Chenadec"
      />
    </ThemeProvider>
  );
}

export default Statistiques;
