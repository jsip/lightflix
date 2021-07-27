import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../../common/components/Layout";
import getInfo from "../../common/lib/getInfo";

export const getServerSideProps = async ({ params }) => {
  const showInfo = await getInfo(params.show, "tv");
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
