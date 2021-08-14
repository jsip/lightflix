import {
  Box,
  SimpleGrid,
  Wrap,
  Heading,
  GridItem,
  WrapItem,
  Link,
  Img,
  Badge,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import Layout from "../../common/components/Layout";
import convertGenres from "../../common/lib/convertGenres";
import getMediaByGenre from "../../common/lib/getMediaByGenre";
import getBiggest from "../../common/utils/getBiggest";
import styles from "../../styles/Home.module.scss";
import getCast from "../../common/lib/getCast";
import checkMediaType from "../../common/lib/checkMediaType";
import Cast from "../../common/components/Cast";

export const getServerSideProps = async ({ params }) => {
  const genreInfo = params.genre;
  return {
    props: {
      genreInfo,
    },
  };
};

const GenrePage = ({ genreInfo }) => {
  const [genre, setGenre] = useState();
  const [moviesFromGenre, setMoviesFromGenre] = useState();
  const [showsFromGenre, setShowsFromGenre] = useState();
  const [mediaGenres, setMediaGenres] = useState([]);
  const [genreActors, setGenreActors] = useState();
  useEffect(() => {
    setMediaGenres([]);
    convertGenres(undefined, genreInfo, 0).then((genre) => {
      genre = genre[0];
      getMediaByGenre("movie", genre.id, "popularity").then((movies) => {
        let genres = [];
        getBiggest.Vals(movies.results, 10).then((movies) => {
          for (let v of movies) {
            genres.push(...v.genre_ids);
            getCast(v.id, "movie").then((castObj) => {
              if (castObj.cast.length > 1) {
                setGenreActors((curr) => [
                  ...(curr || []),
                  castObj.cast[0],
                  castObj.cast[1],
                ]);
              } else {
                setGenreActors((curr) => [...curr]);
              }
            });
          }
          setMoviesFromGenre(movies);
          let modGenres = [...new Set(genres)].filter(
            (w) => w !== parseInt(genreInfo)
          );
          convertGenres("any", modGenres, 8).then((g) => {
            setMediaGenres((curr) => [...curr, ...g]);
          });
        });
      });
      getMediaByGenre("tv", genre.id, "popularity").then((shows) => {
        let genres = [];
        getBiggest.Vals(shows.results, 10).then((shows) => {
          for (let v of shows) {
            genres.push(...v.genre_ids);
            getCast(v.id, "tv").then((castObj) => {
              if (castObj.cast.length > 1) {
                setGenreActors((curr) => [
                  ...(curr || []),
                  castObj.cast[0],
                  castObj.cast[1],
                ]);
              } else {
                setGenreActors((curr) => [...curr]);
              }
            });
          }
          setShowsFromGenre(shows);
          let modGenres = [...new Set(genres)].filter(
            (w) => w !== parseInt(genreInfo)
          );
          convertGenres("any", modGenres, 8).then((g) => {
            setMediaGenres((curr) => [...curr, ...g]);
          });
        });
      });
      setGenre(genre);
    });
  }, [genreInfo]);
  if (
    !genre ||
    !moviesFromGenre ||
    !showsFromGenre ||
    !genreActors ||
    !mediaGenres
  ) {
    return null;
  } else {
    console.log(mediaGenres);
    return (
      <Layout>
        <SimpleGrid columns={6} gap={8}>
          <GridItem className={styles.wrapper} colSpan={5}>
            <Heading mb={4}>Trending {genre.name} Media</Heading>
            <SimpleGrid columns={3}>
              <GridItem colSpan={3}>
                <Box>
                  <Heading fontSize="xl" mt={6} mb={6}>
                    {moviesFromGenre.length > 0 ? "Movies" : null}
                  </Heading>
                  <Wrap spacing="2vw">
                    {moviesFromGenre.map((movie, i) => {
                      return (
                        <div key={i}>
                          <WrapItem>
                            <div style={{ position: "relative" }}>
                              <NextLink
                                href={checkMediaType("href", "movie", movie)}
                                as={checkMediaType("as", "movie", movie)}
                              >
                                <Link>
                                  <Img
                                    src={checkMediaType(
                                      "imgSrc",
                                      "movie",
                                      movie,
                                      "w200"
                                    )}
                                    fallbacksrc={"/noMoviePoster.jpg"}
                                    alt=""
                                    borderRadius="25px"
                                  ></Img>
                                  <Heading
                                    size="sm"
                                    position="absolute"
                                    bottom="12px"
                                    left="16px"
                                    color="white"
                                    textShadow="0px 0px 3px #000000"
                                  >
                                    {checkMediaType("title", "movie", movie)}
                                  </Heading>
                                </Link>
                              </NextLink>
                            </div>
                          </WrapItem>
                        </div>
                      );
                    })}
                  </Wrap>
                </Box>
                <Box>
                  <Heading fontSize="xl" mt={6} mb={6}>
                    {showsFromGenre.length > 0 ? "Shows" : null}
                  </Heading>
                  <Wrap spacing="2vw">
                    {showsFromGenre.map((show, i) => {
                      return (
                        <div key={i}>
                          <WrapItem>
                            <div style={{ position: "relative" }}>
                              <NextLink
                                href={checkMediaType("href", "tv", show)}
                                as={checkMediaType("as", "tv", show)}
                              >
                                <Link>
                                  <Img
                                    src={checkMediaType(
                                      "imgSrc",
                                      "tv",
                                      show,
                                      "w200"
                                    )}
                                    fallbacksrc={"/noMoviePoster.jpg"}
                                    alt=""
                                    borderRadius="25px"
                                  ></Img>
                                  <Heading
                                    size="sm"
                                    position="absolute"
                                    bottom="12px"
                                    left="16px"
                                    color="white"
                                    textShadow="0px 0px 3px #000000"
                                  >
                                    {checkMediaType("title", "tv", show)}
                                  </Heading>
                                </Link>
                              </NextLink>
                            </div>
                          </WrapItem>
                        </div>
                      );
                    })}
                  </Wrap>
                </Box>
                <Box>
                  <Heading mt={12} mb={12}>
                    Recommended Genres for {genre.name}
                  </Heading>
                  <Wrap spacing="5vw" justify="center" m="auto">
                    {mediaGenres
                      ? [
                          ...mediaGenres
                            .reduce(
                              (map, obj) => map.set(obj.name, obj),
                              new Map()
                            )
                            .values(),
                        ].map((genre) => {
                          return (
                            <WrapItem key={genre.id} m={4}>
                              <NextLink
                                href={checkMediaType("href", "genre", genre)}
                                as={checkMediaType("as", "genre", genre)}
                              >
                                <Link>
                                  <Badge
                                    verticalAlign="baseline"
                                    mr={2}
                                    p={8}
                                    borderRadius="15px"
                                  >
                                    {genre.name}
                                  </Badge>
                                </Link>
                              </NextLink>
                            </WrapItem>
                          );
                        })
                      : null}
                  </Wrap>
                </Box>
              </GridItem>
            </SimpleGrid>
          </GridItem>
          <GridItem className={styles.wrapper} colSpan={1}>
            <Wrap direction="column" spacing={6}>
              {/* <Heading>Popular {genre.name} Actors</Heading> */}
              <Cast returnDesc="false" castData={genreActors} disableTooltip />
            </Wrap>
          </GridItem>
        </SimpleGrid>
      </Layout>
    );
  }
};

export default GenrePage;
