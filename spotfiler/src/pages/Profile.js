import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
  getPlaybackState,
  getTopTracks,
  getUserData,
} from "../services/spotify";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { isLogged } from "../services/spotify";
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const sections = [
  { title: "Accueil", url: "/" },
  { title: "Statistiques", url: "/stats" },
  { title: "Profile", url: "/profl" },
];

const defaultTheme = createTheme();

export default function Profile() {
  const [user, setUser] = useState();
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    getUserData().then(setUser);
    getTopTracks().then((tracks) => setTracks(tracks));
    getPlaybackState().then(({ is_playing }) => setPlaying(is_playing));
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Spotfiler" sections={sections} />
        <main>
          <h1>Profil</h1>
          {isLogged() ? (
            <Stack spacing={2}>
              <Item>
                Votre Profil en quelques mots :
                <br />
                Votre nom d'utilisateur est : {user?.display_name} <br />
                Votre adresse mail est : {user?.email} <br />
                Votre pays est : {user?.country} <br />
                Votre nombre d'abonnés est : {user?.followers?.total} <br />
                Votre URL est : {user?.external_urls?.spotify} <br />
                Votre type de compte est : {user?.product} <br />
                <br />
              </Item>
              <Item>
                Vos sont préférés en quelques lignes :
                <br />
                {tracks?.map(({ id, name, artists, image }) => (
                  <p key={id}>
                    {name} by {artists.map((artist) => artist.name).join(", ")}
                  </p>
                ))}
              </Item>
              <Item>
                Êtes vous en train d'écouter ?
                <br />
                {playing
                  ? "Spotify est en train de jouer."
                  : "Spotify ne joue pas."}
              </Item>
            </Stack>
          ) : (
            <p>Vous n'êtes pas connecté</p>
          )}
        </main>
      </Container>
      <Footer
        title="Crédits"
        description="Thomas Legay - Elouarn Le Chenadec"
      />
    </ThemeProvider>
  );
}
