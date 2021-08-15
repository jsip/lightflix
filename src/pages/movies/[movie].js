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
  Wrap,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
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
  const movieInfo = await getInfo(params.movie, "movie");

  return {
    props: {
      movieInfo,
    },
  };
};

const MoviePage = ({ movieInfo }) => {
  console.log(movieInfo);
  const castToDisplay = 6;
  const [castData, setCastData] = useState();
  const [directorData, setDirectorData] = useState();
  const [producerData, setProducerData] = useState();
  const [mostTrendingVideos, setMostTrendingVideos] = useState();
  const [mostTrendingImages, setMostTrendingImages] = useState();
  useEffect(() => {
    media.getVideos(movieInfo.id, "movie").then((videos) => {
      setMostTrendingVideos(videos);
    });
    media.getImages(movieInfo.id, "movie").then((images) => {
      setMostTrendingImages(images);
    });
    getCast(movieInfo.id, "movie").then((cast) => {
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
  }, [movieInfo]);
  if (!castData || !directorData || !producerData) {
    return null;
  } else {
    console.log(movieInfo);
    return (
      <Layout>
        <SimpleGrid columns={8} gap={8}>
          <GridItem className={styles.wrapper} colSpan={2}>
            <Wrap direction="column" spacing={6}>
              <Heading>Cast</Heading>
              <Cast castData={castData} returnDesc={true} />
              <Heading>Directors</Heading>
              <Cast castData={directorData} returnDesc={true} />
              <Heading>Producers</Heading>
              <Cast castData={producerData} returnDesc={true} />
            </Wrap>
          </GridItem>
          <GridItem className={styles.wrapper} colSpan={6}>
            <SimpleGrid columns={3}>
              <GridItem colSpan={1}>
                <Img
                  src={checkMediaType("imgSrc", "movie", movieInfo)}
                  fallbacksrc={"/noMoviePoster.jpg"}
                  alt=""
                  borderRadius="25px"
                />
              </GridItem>
              <GridItem colSpan={2}>
                <Box ml={8}>
                  <Box mb={12}>
                    <Heading fontSize="5xl">
                      {checkMediaType("title", "movie", movieInfo)}
                    </Heading>
                    <Heading fontSize="4xl" opacity={0.5}>
                      {movieInfo.tagline ?
                        <q>
                          <i>{movieInfo.tagline}</i>
                        </q>
                        : null}
                    </Heading>
                  </Box>
                  <span style={{ fontSize: "3vh" }}>
                    {"★".repeat(Math.ceil(movieInfo.vote_average / 2)) +
                      "☆".repeat(5 - Math.ceil(movieInfo.vote_average / 2))}
                  </span>
                  <Flex mt={2} mb={8}>
                    <Box>
                      {movieInfo
                        ? movieInfo.genres.slice(0, 3).map((genre) => (
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
                      {movieInfo.genres.length > 0 ?
                        <span style={{ fontWeight: "800" }}>-&nbsp;&nbsp;</span>
                        : null}
                    </Box>
                    <Text fontWeight="600">
                      {formatRuntime(
                        checkMediaType("runtime", "movie", movieInfo)
                      )}
                      &nbsp;&nbsp;
                      <span className={styles.releaseDateBefore}>
                        <span style={{}}>&#xB7;</span>
                        &nbsp;
                        {checkMediaType("releaseDate", "movie", movieInfo)}
                      </span>
                    </Text>
                  </Flex>
                  <Box>{checkMediaType("desc", "movie", movieInfo)}</Box>
                  <Media
                    mostTrendingImages={mostTrendingImages}
                    mostTrendingVideos={mostTrendingVideos}
                  />
                </Box>
              </GridItem>
            </SimpleGrid>
            <RCards mediaType={"movie"} Id={movieInfo.id} fallbackId={"379686"} />
          </GridItem>
        </SimpleGrid>
      </Layout>
    );
  }
};

export default MoviePage;
