import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Layout from "../components/Layout";
import fetchData from "../lib/fetchData";
import API_KEY from "../utils/constants";

export const getStaticProps = async () => {
  const movies = await fetchData(
    `https://api.themoviedb.org/3/trending/movies/week?api_key=${API_KEY}`,
  );
  return {
    props: {
      movies,
    },
  };
};

const Genres = ({ movies }) => {
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

export default Genres;
