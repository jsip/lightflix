import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../../common/components/Layout";
import getInfo from "../../common/lib/getInfo";

export const getServerSideProps = async ({ params }) => {
  const castInfo = await getInfo(params.cast, "person");
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
