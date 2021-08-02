import { Flex, GridItem, Heading, Select, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ATrending from "../common/components/ATrending";
import Loader from "../common/components/Loader";
import Layout from "../common/components/Layout";
import MTrending from "../common/components/MTrending";
import TCards from "../common/components/TCards";
import convertGenres from "../common/lib/convertGenres";
import getCast from "../common/lib/getCast";
import getInfo from "../common/lib/getInfo";
import media from "../common/lib/getMedia";
import getPopularPeople from "../common/lib/getPopularPeople";
import getTrending from "../common/lib/getTrending";
import getBiggest from "../common/utils/getBiggest";
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
  const castToDisplay = 5;

  useEffect(() => {
    getTrending(mediaType, timeframe).then((trending) => {
      setTrendingData(trending.results);
      getBiggest.Val(trending.results).then((res) => {
        console.log(res);
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
      getCast(res.id, res.media_type).then((cast) => {
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
      convertGenres(res.media_type, res.genre_ids, 3).then((genres) => {
        setMainGenres(genres);
      });
    }
  }, [mostTrending]);

  if (
    (!trendingData,
    !mostTrending,
    !mostTrendingInfo,
    !otherPopular,
    !mainGenres,
    !mostTrendingVideos,
    !mostTrendingImages,
    !castData,
    !mediaType,
    !timeframe)
  ) {
    return null;
  } else
    return (
      <Layout>
        <SimpleGrid columns={6} gap={8}>
          <GridItem className={styles.wrapper} colSpan={5}>
            <SimpleGrid columns={3}>
              <GridItem colSpan={1} w="max-content">
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
                <TCards
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
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem>
            {otherPopular ? <ATrending otherPopular={otherPopular} /> : null}
          </GridItem>
        </SimpleGrid>
      </Layout>
    );
};

export default Home;
