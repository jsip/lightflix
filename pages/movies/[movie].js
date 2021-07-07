import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import fetchMovies from "../lib/fetchMovies";
import { getMovieInfo } from "../lib/getMovieInfo";
import { API_KEY } from "../utils/constants";

export const getStaticPaths = async () => {
  const moviePaths = await fetchMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`,
    `die`
  );
  const paths = moviePaths.results.map((movie) => ({
    params: {
      movie: movie.id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const movieInfo = await getMovieInfo(params.movie);
  return {
    props: {
      movieInfo,
    },
    revalidate: 1,
  };
};

const Movie = ({ movieInfo }) => {
  console.log(movieInfo);
  return (
    <Layout>
      <Box>{movieInfo.title}</Box>
    </Layout>
  );
};

export default Movie;
