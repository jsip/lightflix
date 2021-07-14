import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";

export const getServerSideProps = async ({ params }) => {
  const genreInfo = params.genre;
  return {
    props: {
      genreInfo,
    },
  };
};

const Genre = ({ genreInfo }) => {
  return (
    <Layout>
      <Box>{genreInfo}</Box>
    </Layout>
  );
};

export default Genre;
