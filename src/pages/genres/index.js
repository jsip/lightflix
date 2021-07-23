import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import Layout from "../../common/components/Layout";
import fetchData from "../../common/lib/fetchData";
import API_KEY from "../../common/utils/constants";

export const getStaticProps = async () => {
  const genres = await fetchData(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
  );
  return {
    props: {
      genres,
    },
  };
};

const Genres = ({ genres }) => {
  const _genres = genres.genres.map((genre) => {
    return (
      <NextLink
        key={genre.id}
        href="/genres/[genre]"
        as={`/genres/${genre.name}`}
      >
        <Link>
          <Heading>{genre.name}</Heading>
        </Link>
      </NextLink>
    );
  });
  return <Layout>{_genres}</Layout>;
};

export default Genres;
