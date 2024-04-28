import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import {
  getPlaybackState,
  getTopTracks,
  isLogged,
  getUserData,
  loginSpotify,
  logoutSpotify,
} from "../services/spotify";

function Header(props) {
  const { sections, title } = props;
  const [user, setUser] = useState();
  const [tracks, setTracks] = useState([]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    getUserData().then(setUser);
    getTopTracks().then((tracks) => setTracks(tracks));
    getPlaybackState().then(({ is_playing }) => setPlaying(is_playing));
  }, []);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        {isLogged() ? (
          <p>Vous êtes connecté en tant que {user?.display_name}</p>
        ) : (
          <p>Vous n'êtes pas connecté</p>
        )}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {isLogged() ? (
          <Button variant="outlined" size="small" onClick={logoutSpotify}>
            Se déconnecter
          </Button>
        ) : (
          <Button variant="outlined" size="small" onClick={loginSpotify}>
            Se connecter
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
