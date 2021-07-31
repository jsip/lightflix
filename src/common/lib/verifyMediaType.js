import React from "react";
import media from "./getMedia";

const tv = [
  "backdrop_path",
  "first_air_date",
  "genre_ids",
  "id",
  "media_type",
  "name",
  "origin_country",
  "original_language",
  "original_name",
  "overview",
  "popularity",
  "poster_path",
  "vote_average",
  "vote_count",
];

const movie = [
  "backdrop_path",
  "genre_ids",
  "id",
  "media_type",
  "original_language",
  "original_title",
  "overview",
  "popularity",
  "poster_path",
  "release_date",
  "title",
  "video",
  "vote_average",
  "vote_count",
];

const matchKey = (mediaInfo, movieTvKey) => {
  let arr = [];
  for (let m of mediaInfo) {
    console.log(m);
  }
  console.log(mediaInfo, movieTvKey);
};

const verifyMediaType = (mediaInfo) => {
  console.log(mediaInfo);
  if (mediaInfo.media_type) {
    if (mediaInfo.media_type === "movie") {
      console.log("has media type movie");
    } else if (mediaInfo.media_type === "tv") {
      console.log("has media type tv");
    } else {
      console.log("has no media type");
    }
  } else if (!mediaInfo.media_type) {
    matchKey(mediaInfo, tv);
    console.log("no media type");
  }
};

export default verifyMediaType;
