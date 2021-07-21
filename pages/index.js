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
  const [trendingImages, setTrendingImages] = useState();
  const [mediaType, setMediaType] = useState("all");
  const [timeframe, setTimeframe] = useState("week");

  useEffect(() => {
    getTrending(mediaType, timeframe).then((trending) => {
      setTrendingData(trending);
      setMostTrending(getMostTrending(trending.results));
    });
  }, [mediaType, timeframe, trendingImages]);

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
                  name="mediaType"
                  variant="filled"
                  w="fit-content"
                  mr={4}
                  fontWeight="semibold"
                  onChange={(e) => setMediaType(e.target.value || "all")}
                >
                  <option value="movie">Movies</option>
                  <option value="tv">Shows</option>
                  <option value="person" disabled>
                    Casts
                  </option>
                </Select>
                <Select
                  placeholder="Any Timeframe"
                  name="timeframe"
                  size="md"
                  w="fit-content"
                  variant="filled"
                  fontWeight="semibold"
                  onChange={(e) => setTimeframe(e.target.value || "week")}
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                </Select>
              </Flex>
              <TCard trendingData={trendingData} />
            </GridItem>
            <GridItem colSpan={2}>
              <MTrending mostTrending={mostTrending} />
              <Flex></Flex>
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
