import { Box, Flex, Grid, GridItem, Heading, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import Layout from "./components/Layout";
import MTrending from "./components/MTrending";
import TCard from "./components/TCard";
import getTrending from "./lib/getTrending";
import getMostTrending from "./utils/getMostTrending";

const Home = () => {
  const [trendingData, setTrendingData] = useState();
  const [mostTrending, setMostTrending] = useState();
  const [mediaType, setMediaType] = useState("all");
  const [timeframe, setTimeframe] = useState("week");

  useEffect(() => {
    getTrending(mediaType, timeframe).then((t) => {
      setTrendingData(t);
      let _mostTrending = getMostTrending(t.results);
      setMostTrending(_mostTrending);
    });
  }, [mediaType, timeframe]);

  return (
    <Layout>
      <Grid templateColumns="78% 20%" gap={8}>
        <GridItem className={styles.wrapper}>
          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            <GridItem colSpan={1}>
              <Heading>Trending</Heading>
              <Flex mt={4} mb={6}>
                <Select
                  placeholder="Any Media"
                  size="md"
                  variant="filled"
                  w="fit-content"
                  mr={4}
                  fontWeight="semibold"
                >
                  <option value="option1">Movies</option>
                  <option value="option2">Shows</option>
                  <option value="option3">Casts</option>
                </Select>
                <Select
                  placeholder="Any Timeframe"
                  size="md"
                  w="fit-content"
                  variant="filled"
                  fontWeight="semibold"
                >
                  <option value="option1">Today</option>
                  <option value="option2">This Week</option>
                </Select>
              </Flex>
              <TCard trendingData={trendingData} />
            </GridItem>
            <GridItem colSpan={2}>
              <MTrending mostTrending={mostTrending} />
              <Flex>
                <Box></Box>
                <Box></Box>
              </Flex>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem className={styles.wrapper}>
          <div>featured</div>
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Home;
