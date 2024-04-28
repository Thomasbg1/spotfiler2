import React, { useState, useEffect } from "react";
import "../assets/TenArtists.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";

export default function TenArtists({ artistToGenres, token }) {
  const [open, setOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [recommendedArtists, setRecommendedArtists] = useState([""]);

  const artist = artistToGenres.map((art) => {
    return art.artistName;
  });

  const href = artistToGenres.map((art) => {
    return art.artistHref;
  });

  const genreArt = artistToGenres.map((art) => {
    return art.genresArr.join(", ");
  });

  const follow = artistToGenres.map((art) => {
    return art.artistFollowers;
  });

  const image = artistToGenres.map((art) => {
    return art.artistImage;
  });

  const handleClickOpen = (artist) => {
    setSelectedArtist(artist);
    fetchRecommendations(artist);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchRecommendations = async (artist) => {
    try {
      const response = await axios.get(
        "https://api.spotify.com/v1/recommendations",
        {
          params: {
            seed_artists: "4NHQUGzhtTLFvgF5SZesLK",
            seed_genres: "classical,country",
            limit: 5,
          },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setRecommendedArtists(response.data.artists);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendedArtists(["Aucun artiste recommandé trouvé"]);
    }
  };

  return (
    <div>
      <div>
        <h1 className="chart-title">Artistes favoris</h1>
        <List>
          {artistToGenres.map((art, index) => (
            <div key={index}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={art.artistName} src={art.artistImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    // <span onClick={() => handleClickOpen(art)}>
                    <span>
                      {index +
                        1 +
                        ". " +
                        art.artistName +
                        " - Découvrir des artistes similaires"}
                    </span>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {art.artistFollowers + " followers"}
                      </Typography>
                      {" — " + art.genresArr.join(", ")}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Artistes recommandés</DialogTitle>
        <DialogContent>
          <List>
            {recommendedArtists.map((artist, index) => (
              <div key={index}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={artist.name} src={artist.images[0].url} />
                  </ListItemAvatar>
                  <ListItemText primary={artist.name} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
