import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Layout from "../components/Layout";
import fetchData from "../lib/fetchData";
import API_KEY from "../utils/constants";

export const getStaticProps = async () => {

  // placeholder
  const genres = [
    "Horror",
    "Comedy",
    "Action",
    "Adventure",
    "Sci-Fi",
    "Drama",
    "Thriller",
    "Crime",
    "Animation",
    "Family",
    "Fantasy",
    "Mystery",
    "Western",
    "Romance",
    "History",
    "War",
    "Biography",
    "Music",
    "Documentary",
    "Sport",
    "News",
    "Reality-TV",
    "Game-Show",
    "Mini-Series",
    "Talk-Show",
  ];
  return {
    props: {
      genres,
    },
  };
};

const Genres = ({ genres }) => {
  const _genres = genres.map((genre) => {
    console.log(genre);
    return (
      <NextLink key={genre} href="/genres/[genre]" as={`/genres/${genre}`}>
        <Link>
          <Heading>{genre}</Heading>
        </Link>
      </NextLink>
    );
  });
  return <Layout>{_genres}</Layout>;
};

export default Genres;
