import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Select,
  VStack,
  Box,
  Stack,
  Image,
  StackDivider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../common/components/Layout";
import MTrending from "../common/components/MTrending";
import TCard from "../common/components/TCard";
import getPopularPeople from "../common/lib/getPopularPeople";
import getTrending from "../common/lib/getTrending";
import getMostTrending from "../common/utils/getMostTrending";
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [trendingData, setTrendingData] = useState();
  const [mostTrending, setMostTrending] = useState();
  const [otherThreePopular, setOtherThreePopular] = useState();
  const [mediaType, setMediaType] = useState("all");
  const [timeframe, setTimeframe] = useState("week");

  useEffect(() => {
    getTrending(mediaType, timeframe).then((trending) => {
      setTrendingData(trending);
      setMostTrending(getMostTrending(trending.results));
    });
    getPopularPeople().then((popular) => {
      setOtherThreePopular([
        popular.results[1],
        popular.results[2],
        popular.results[3],
      ]);
    });
  }, [mediaType, timeframe]);

  console.log(otherThreePopular);

  return (
    <Layout>
      <Grid templateColumns="81% 17%" gap={8}>
        <GridItem className={styles.wrapper}>
          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            <GridItem colSpan={1}>
              <Heading>Trending Media</Heading>
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
                  <option value="person">Casts</option>
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
        <GridItem>
          {otherThreePopular
            ? otherThreePopular.map((actor, i) => (
                <div key={i} className={styles.actorCard}>
                  <Box>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={`${actor.name}'s photo`}
                      className={styles.actorImg}
                    ></Image>
                    {actor.name}
                  </Box>
                </div>
              ))
            : null}
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Home;
