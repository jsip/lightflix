import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Layout from "../components/Layout";
import fetchMovies from "../lib/fetchMovies";
import { API_KEY } from "../utils/constants";

export const getStaticProps = async () => {
  const movies = await fetchMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`,
    `die`
  );
  return {
    props: {
      movies,
    },
  };
};

const Movies = ({ movies }) => {
  const _movies = movies.results.map((movie) => {
    let id = movie.id.toString();
    return (
      <NextLink key={movie.id} href="/movies/[movie]" as={`/movies/${id}`}>
        <Link>
          <Heading>{movie.title}</Heading>
        </Link>
      </NextLink>
    );
  });
  return <Layout>{_movies}</Layout>;
};

export default Movies;
