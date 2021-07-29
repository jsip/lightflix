import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Layout from "../../common/components/Layout";
import convertGenres from "../../common/lib/convertGenres";

export const getServerSideProps = async ({ params }) => {
  const genreInfo = params.genre;
  return {
    props: {
      genreInfo,
    },
  };
};

const Genre = ({ genreInfo }) => {
  const [genre, setGenre] = useState();
  useEffect(() => {
    convertGenres(undefined, genreInfo).then((genre) => setGenre(genre[0]));
  }, [genreInfo]);
  return <Layout>{<Box>{genre.name}</Box>}</Layout>;
};

export default Genre;
