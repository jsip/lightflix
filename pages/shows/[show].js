import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../components/Layout";
import getShowInfo from "../lib/getShowInfo";

export const getServerSideProps = async ({ params }) => {
  const showInfo = await getShowInfo(params.show);
  console.log(showInfo, params);
  return {
    props: {
      showInfo,
    },
  };
};

const Show = ({ showInfo }) => {
  return (
    <Layout>
      <Box>{showInfo.name}</Box>
      <Box>{showInfo.overview}</Box>
    </Layout>
  );
};

export default Show;
