import {
  Badge,
  Box,
  Flex,
  GridItem,
  Heading,
  Img,
  Link,
  SimpleGrid,
  Text,
  Wrap
} from "@chakra-ui/react";
import NextLink from "next/link";
import { React, useEffect, useState } from "react";
import Cast from "../../common/components/Cast";
import Layout from "../../common/components/Layout";
import Media from "../../common/components/Media";
import RCards from "../../common/components/RCards";
import checkMediaType from "../../common/lib/checkMediaType";
import getCast from "../../common/lib/getCast";
import getInfo from "../../common/lib/getInfo";
import media from "../../common/lib/getMedia";
import formatRuntime from "../../common/utils/formatRuntime";
import randElems from "../../common/utils/getRandElems";
import styles from "../../styles/Home.module.scss";

export const getServerSideProps = async ({ params }) => {
  const showInfo = await getInfo(params.show, "tv");
  return {
    props: {
      showInfo,
    },
  };
};

const ShowPage = ({ showInfo }) => {
  console.log(showInfo);
  const castToDisplay = 6;
  const [castData, setCastData] = useState();
  const [directorData, setDirectorData] = useState();
  const [producerData, setProducerData] = useState();
  const [mostTrendingVideos, setMostTrendingVideos] = useState();
  const [mostTrendingImages, setMostTrendingImages] = useState();
  useEffect(() => {
    media.getVideos(showInfo.id, "tv").then((videos) => {
      setMostTrendingVideos(videos);
    });
    media.getImages(showInfo.id, "tv").then((images) => {
      setMostTrendingImages(images);
    });
    getCast(showInfo.id, "tv").then((cast) => {
      const producer = randElems.getRandElemsIncludes(
        cast.crew,
        3,
        "job",
        "Producer"
      );
      const director = randElems.getRandElemsIncludes(
        cast.crew,
        3,
        "job",
        "Director"
      );
      setCastData(cast.cast.splice(0, castToDisplay));
      setDirectorData(producer[0]);
      setProducerData(director[0]);
    });
  }, [showInfo]);
  if (!castData || !directorData || !producerData) {
    return null;
  } else
    return (
      <Layout>
        <SimpleGrid columns={10} gap={8}>
          <GridItem className={styles.wrapper} colSpan={2}>
            <Wrap direction="column" spacing={6}>
              <Heading>Crédits</Heading>
              <Cast castData={castData} returnDesc={true} />
              <Heading>Directeurs</Heading>
              <Cast castData={directorData} returnDesc={true} />
              <Heading>Réalisateurs</Heading>
              <Cast castData={producerData} returnDesc={true} />
            </Wrap>
          </GridItem>
          <GridItem className={styles.wrapper} colSpan={8}>
            <SimpleGrid columns={3}>
              <GridItem colSpan={1}>
                <Img
                  src={checkMediaType("imgSrc", "tv", showInfo)}
                  alt=""
                  borderRadius="25px"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Box ml={8}>
                  <Box mb={12}>
                    <Heading fontSize="5xl">
                      {checkMediaType("title", "tv", showInfo)}
                    </Heading>
                    <Heading fontSize="4xl" opacity={0.5}>
                      {showInfo.tagline ? (
                        <q>
                          <i>{showInfo.tagline}</i>
                        </q>
                      ) : null}
                    </Heading>
                  </Box>
                  <span style={{ fontSize: "3vh" }}>
                    {"★".repeat(Math.ceil(showInfo.vote_average / 2)) +
                      "☆".repeat(5 - Math.ceil(showInfo.vote_average / 2))}
                  </span>
                  <Flex mt={2} mb={8}>
                    <Box>
                      {showInfo
                        ? showInfo.genres.slice(0, 3).map((genre) => (
                            <NextLink
                              key={genre.id}
                              href={checkMediaType("href", "genre", genre)}
                              as={checkMediaType("as", "genre", genre)}
                            >
                              <Link>
                                <Badge
                                  verticalAlign="baseline"
                                  key={genre.id}
                                  mr={2}
                                >
                                  {genre.name}
                                </Badge>
                              </Link>
                            </NextLink>
                          ))
                        : null}
                    </Box>
                    <Text fontWeight="600">
                      <span style={{ fontWeight: "800" }}>-</span>
                      &nbsp;&nbsp;
                      {formatRuntime(
                        checkMediaType("runtime", "tv", showInfo)
                      ) + " (par épisode)"}
                      &nbsp;&nbsp;
                      <span className={styles.releaseDateBefore}>
                        <span style={{}}>&#xB7;</span>
                        &nbsp;
                        {checkMediaType("releaseDate", "tv", showInfo)}
                      </span>
                    </Text>
                  </Flex>
                  <Box>{checkMediaType("desc", "tv", showInfo)}</Box>
                  <Media
                    mostTrendingImages={mostTrendingImages}
                    mostTrendingVideos={mostTrendingVideos}
                  />
                </Box>
              </GridItem>
            </SimpleGrid>
            <RCards mediaType={"tv"} Id={showInfo.id} />
          </GridItem>
        </SimpleGrid>
      </Layout>
    );
};

export default ShowPage;
