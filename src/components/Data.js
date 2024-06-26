import React, { useEffect, useState } from "react";
import indexOfMax from "./IndexOfMax.js";
import Chart from "./Chart.js";
import axios from "axios";

export default function Data({ token }) {
  const [topArtists, setTopArtists] = useState([]);
  const [artistToGenres, setArtistToGenres] = useState([]);
  const [pie, setPie] = useState([]);

  useEffect(() => {
    const getTopArtists = async (token) => {
      const headers = {
        Authorization: "Bearer " + token,
      };
      await axios
        .get("https://api.spotify.com/v1/me/top/artists", { headers })
        .then((response) => {
          var mRes = response.data.items;
          if (mRes) {
            setTopArtists(mRes);
          }
        });

      const currArtistsToGenres = topArtists.map((artist, index) => {
        const artistId = artist.id;
        const artistName = artist.name;
        const genresArr = artist.genres;
        const artistHref = artist.external_urls.spotify;
        const artistFollowers = artist.followers.total;
        const artistImage = artist.images[0].url;
        return {
          artistId: artistId,
          artistName: artistName,
          genresArr: genresArr,
          artistHref: artistHref,
          artistFollowers: artistFollowers,
          artistImage: artistImage,
        };
      });
      setArtistToGenres(currArtistsToGenres);

      const unorganizedGenres = topArtists.map((artist, index) => {
        return artist.genres;
      });

      const allGenres = [].concat(...unorganizedGenres);

      var frequency = {};

      allGenres.map((genre) => {
        frequency[genre] = 0;
      });

      allGenres.map((genre) => {
        frequency[genre] = frequency[genre] + 1;
      });

      var keys = Object.keys(frequency);
      var vals = Object.values(frequency);
      var a = 0;
      var finalArr = [];

      while (a != 20 && keys.length != 0) {
        var currIndex = indexOfMax(vals);
        finalArr.push(keys[currIndex]);
        keys.splice(currIndex, 1);
        vals.splice(currIndex, 1);
        a++;
      }

      var finalObj = {};

      finalArr.map((genre) => {
        finalObj[genre] = frequency[genre];
      });

      var artists = [];

      Object.keys(finalObj).map((key) => {
        var genre = key + " (";

        currArtistsToGenres.map((artist) => {
          if (artist.genresArr.includes(key)) {
            artists.push(artist.artistName);
          }
        });

        artists.map((artist) => {
          genre = genre + artist + ", ";
          return genre;
        });
      });

      const sum = Object.values(finalObj).reduce(
        (partialSum, a) => partialSum + a,
        0
      );

      var pieData = Object.keys(finalObj).map((key) => {
        return { name: key, value: Math.round((finalObj[key] / sum) * 100) };
      });

      setPie(pieData);
    };
    getTopArtists(token);
  });

  return <Chart pie={pie} artistToGenres={artistToGenres} token={token} />;
}
