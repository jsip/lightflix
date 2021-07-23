import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../../common/components/Layout";
import getShowInfo from "../../common/lib/getShowInfo";

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
