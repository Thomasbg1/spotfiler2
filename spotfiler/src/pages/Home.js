import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import MainFeaturedPost from "../components/MainFeaturedPost";
import FeaturedPost from "../components/FeaturedPost";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import {
  getPlaybackState,
  getTopTracks,
  getUserData,
} from "../services/spotify";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

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
  { title: "Profil", url: "/profil" },
];

const mainFeaturedPost = {
  title: "Spotify vous vole vos données... et vous en redemandez !",
  description:
    "C'est pourquoi nous vous proposons des statistiques un peu atypiques pour que votre consommation soit vue sous un autre angle.",
  image:
    "https://assets-global.website-files.com/5ec25240d0324323e43b84ca/657723633cfe29a8f736ccca_spotify-logo-1920x1080.jpg",
  imageText: "Logo de l application Spotify",
};

const featuredPosts = [
  {
    title: "Votre profil Spotify",
    description:
      "Ici, nous mettons en lumière un certain nombre de vos données récupérées par Spotify. Cela correspond au données de votre profil qui sont stockées et utilisables.",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
    link: "/profil",
  },
  {
    title: "Diagramme réprésentatif de vos goûts musicaux",
    description:
      "Une petite illustration de votre consommation. Vous ne verrez plus jamais votre musique de la même manière (effet garanti ou remboursé).",
    image: "https://source.unsplash.com/random?wallpapers",
    imageLabel: "Image Text",
    link: "/stats",
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
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
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer
        title="Crédits"
        description="Thomas Legay - Elouarn Le Chenadec"
      />
    </ThemeProvider>
  );
}
