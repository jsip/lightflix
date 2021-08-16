import {
  Flex,
  GridItem,
  Heading,
  Select,
  SimpleGrid,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import lang from "../common/api/routeri18n";
import ATrending from "../common/components/ATrending";
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
  lang = "fr";

  useEffect(() => {
    getTrending(mediaType, timeframe).then((trending) => {
      setTrendingData(trending.results);
      getBiggest.Val(trending.results, "popularity").then((res) => {
        setMostTrending(res);
      });
    });
    getPopularPeople().then((popular) => {
      setOtherPopular(
        popular.results
          .filter((p) => p.profile_path)
          .slice(1, actorsToDisplay + 1)
      );
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
        <SimpleGrid columns={8} gap={8} minChildWidth="10vw">
          <GridItem className={styles.wrapper} colSpan={6}>
            <SimpleGrid columns={3}>
              <GridItem colSpan={1} w="max-content">
                <Heading fontSize="3xl">À la une</Heading>
                <Flex mt={4} mb={6}>
                  <Select
                    placeholder="Tout les Médias"
                    size="md"
                    name="mediaType"
                    variant="filled"
                    w="fit-content"
                    mr={4}
                    fontWeight="semibold"
                    onChange={(e) => setMediaType(e.target.value || "all")}
                  >
                    <option value="movie">Films</option>
                    <option value="tv">Séries</option>
                    <option value="person">Crédits</option>
                  </Select>
                  <Select
                    placeholder="Toutes les Périodes"
                    name="timeframe"
                    size="md"
                    w="fit-content"
                    variant="filled"
                    fontWeight="semibold"
                    onChange={(e) => setTimeframe(e.target.value || "week")}
                  >
                    <option value="day">Aujourd&apos;hui</option>
                    <option value="week">Cette Semaine</option>
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
          <GridItem colSpan={2}>
            <Wrap>
              {otherPopular ? <ATrending otherPopular={otherPopular} /> : null}
            </Wrap>
          </GridItem>
        </SimpleGrid>
      </Layout>
    );
};

export default Home;
