import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../../common/components/Layout";
import getMovieInfo from "../../common/lib/getMovieInfo";

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
