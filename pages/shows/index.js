import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Layout from "../components/Layout";
import fetchData from "../lib/fetchData";
import API_KEY from "../utils/constants";

export const getStaticProps = async () => {
  const shows = await fetchData(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`
  );
  return {
    props: {
      shows,
    },
  };
};

const Shows = ({ shows }) => {
  const _shows = shows.results.map((show) => {
    let id = show.id.toString();
    return (
      <NextLink key={show.id} href="/shows/[show]" as={`/shows/${id}`}>
        <Link>
          <Heading>{show.name}</Heading>
        </Link>
      </NextLink>
    );
  });
  return <Layout>{_shows}</Layout>;
};

export default Shows;
