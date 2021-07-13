import React from "react";

const fetchMovies = async (url, query) => {
  let data;
  if (url) {
    const res = await fetch(`${url}${query}`);
    data = await res.json();
  }
  console.log(data);
  return data;
};

export default fetchMovies;
