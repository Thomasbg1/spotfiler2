import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

function Sectionsgroupe(props) {
  const { section } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {section.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {section.description}
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Sectionsgroupe.propTypes = {
  section: PropTypes.shape({
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sectionsgroupe;
