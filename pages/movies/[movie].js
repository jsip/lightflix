import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import fetchMovies from "../lib/fetchMovies";
import { getMovieInfo } from "../lib/getMovieInfo";
import { API_KEY } from "../utils/constants";

export const getServerSideProps = async ({ params }) => {
  const movieInfo = await getMovieInfo(params.movie);

  return {
    props: {
      movieInfo,
    },
  };
};

const Movie = ({ movieInfo }) => {
  return (
    <Layout>
      <Box>{movieInfo.title}</Box>
      <Box>{movieInfo.overview}</Box>
    </Layout>
  );
};

export default Movie;
