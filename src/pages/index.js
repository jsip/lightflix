import { Flex, Grid, GridItem, Heading, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ATrending from "../common/components/ATrending";
import Layout from "../common/components/Layout";
import MTrending from "../common/components/MTrending";
import TCard from "../common/components/TCard";
import convertGenres from "../common/lib/convertGenres";
import getInfo from "../common/lib/getInfo";
import getCast from "../common/lib/getCast";
import media from "../common/lib/getMedia";
import getPopularPeople from "../common/lib/getPopularPeople";
import getTrending from "../common/lib/getTrending";
import getBiggestVal from "../common/utils/getBiggestVal";
import styles from "../styles/Home.module.scss";

const Home = () => {
  const [trendingData, setTrendingData] = useState();
  const [mostTrending, setMostTrending] = useState();
  const [mostTrendingInfo, setMostTrendingInfo] = useState();
  const [otherPopular, setOtherPopular] = useState();
  const [mainGenres, setMainGenres] = useState();
  const [mostTrendingVideos, setMostTrendingVideos] = useState();
  const [mostTrendingImages, setMostTrendingImages] = useState();
  const [castData, setCastData] = useState();
  const [mediaType, setMediaType] = useState("all");
  const [timeframe, setTimeframe] = useState("week");
  const actorsToDisplay = 2;
  const castToDisplay = 6;

  useEffect(() => {
    getTrending(mediaType, timeframe).then((trending) => {
      setTrendingData(trending.results);
      getBiggestVal(trending.results).then((res) => {
        setMostTrending(res);
      });
    });
    getPopularPeople().then((popular) => {
      setOtherPopular(popular.results.slice(1, actorsToDisplay + 1));
    });
  }, [mediaType, timeframe]);

  useEffect(() => {
    if (mostTrending) {
      const res = mostTrending;
      console.log(res);
      getCast(res.id, res.media_type).then((cast) => {
        console.log(cast);
        setCastData(cast.cast.splice(0, castToDisplay));
      });
      getInfo(res.id, res.media_type).then((info) => {
        setMostTrendingInfo(info);
      });
      media.getVideos(res.id, res.media_type).then((videos) => {
        setMostTrendingVideos(videos);
      });
      media.getImages(res.id, res.media_type).then((images) => {
        setMostTrendingImages(images);
      });
      convertGenres(res.media_type, res.genre_ids).then((genres) => {
        console.log(genres);
        setMainGenres(genres);
      });
    }
  }, [mostTrending]);

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
              <TCard
                trendingData={trendingData}
                cardHover={(data) => {
                  setMostTrending(data);
                }}
              />
            </GridItem>
            <GridItem colSpan={2}>
              <MTrending
                mostTrending={mostTrending}
                mostTrendingInfo={mostTrendingInfo}
                mainGenres={mainGenres}
                mostTrendingVideos={mostTrendingVideos}
                mostTrendingImages={mostTrendingImages}
                castData={castData}
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
