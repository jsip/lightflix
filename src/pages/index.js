import { Flex, Grid, GridItem, Heading, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ATrending from "../common/components/ATrending";
import Layout from "../common/components/Layout";
import MTrending from "../common/components/MTrending";
import TCard from "../common/components/TCard";
import convertGenres from "../common/lib/convertGenres";
import media from "../common/lib/getMedia";
import getPopularPeople from "../common/lib/getPopularPeople";
import getTrending from "../common/lib/getTrending";
import getBiggestVal from "../common/utils/getBiggestVal";
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [trendingData, setTrendingData] = useState();
  const [mostTrending, setMostTrending] = useState();
  const [otherPopular, setOtherPopular] = useState();
  const [mainGenres, setMainGenres] = useState();
  const [mostTrendingVideos, setMostTrendingVideos] = useState();
  const [mostTrendingImages, setMostTrendingImages] = useState();
  const [mediaType, setMediaType] = useState("all");
  const [timeframe, setTimeframe] = useState("week");
  const actorsToDisplay = 2;

  useEffect(() => {
    getTrending(mediaType, timeframe).then((trending) => {
      setTrendingData(trending);
      getBiggestVal(trending.results).then((res) => {
        setMostTrending(res);
        media.getVideos(res.id, res.media_type).then((videos) => {
          setMostTrendingVideos(videos);
        });
        media.getImages(res.id, res.media_type).then((images) => {
          setMostTrendingImages(images);
        });
        convertGenres(res.media_type, res.genre_ids).then((genres) =>
          setMainGenres(genres)
        );
      });
    });
    getPopularPeople().then((popular) => {
      setOtherPopular(popular.results.slice(1, actorsToDisplay + 1));
    });
  }, [mediaType, timeframe]);

  return (
    <Layout>
      <Grid templateColumns="81% 17%" gap={8}>
        <GridItem className={styles.wrapper}>
          <Grid templateColumns="repeat(3, 1fr)" gap={8}>
            <GridItem colSpan={1}>
              <Heading fontSize="3xl">Trending</Heading>
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
              <MTrending
                mostTrending={mostTrending}
                mainGenres={mainGenres}
                mostTrendingVideos={mostTrendingVideos}
                mostTrendingImages={mostTrendingImages}
              />
              <Flex></Flex>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem>
          {otherPopular ? <ATrending otherPopular={otherPopular} /> : null}
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default Home;
