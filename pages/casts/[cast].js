import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import getCastInfo from "../lib/getCastInfo";

export const getServerSideProps = async ({ params }) => {
  const castInfo = await getCastInfo(params.cast);

  return {
    props: {
      castInfo,
    },
  };
};

const Cast = ({ castInfo }) => {
  return (
    <Layout>
      <Box>{castInfo.name}</Box>
      <Box>{castInfo.known_for_department}</Box>
    </Layout>
  );
};

export default Cast;