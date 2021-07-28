import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  GridItem,
  Text,
  Wrap,
  Spacer,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import checkMediaType from "../lib/checkMediaType";
import EmbeddedYT from "./EmbeddedYT";
import styles from "../../styles/Home.module.scss";
import randElems from "../utils/getRandElems";
import formatRuntime from "../utils/formatRuntime";
import Cast from "./Cast";

const MTrending = ({
  mostTrending,
  mostTrendingInfo,
  mainGenres,
  mostTrendingVideos,
  mostTrendingImages,
  castData,
}) => {
  console.log(mostTrendingImages);
  const mediaMax = 3;
  if (
    !mostTrending ||
    !mainGenres ||
    !mostTrendingVideos ||
    !mostTrendingImages ||
    !mostTrendingInfo ||
    !castData
  ) {
    return null;
  } else {
    return (
      <div>
        <div style={{ position: "relative" }}>
          <Image
            src={checkMediaType(
              "imgSrcBackdrop",
              mostTrending.media_type,
              mostTrending
            )}
            fallbackSrc={"/noMoviePoster.jpg"}
            alt=""
            borderRadius="25px"
          ></Image>
          <Heading
            size="lg"
            position="absolute"
            bottom="12px"
            left="16px"
            color="white"
            textShadow="0px 0px 5px #424242"
          >
            {checkMediaType("title", mostTrending.media_type, mostTrending)}
          </Heading>
        </div>
        <Box columns={1} mt={8}>
          <Flex mt={8}>
            <Box>
              {mainGenres
                ? mainGenres.map((genre) => (
                    <Badge verticalAlign="baseline" key={genre.id} mr={2}>
                      {genre.name}
                    </Badge>
                  ))
                : null}
            </Box>
            <Text fontWeight="600">
              <span style={{ fontWeight: "800" }}>-</span>
              &nbsp;&nbsp;
              {formatRuntime(
                checkMediaType(
                  "runtime",
                  mostTrending.media_type,
                  mostTrendingInfo
                )
              )}
              &nbsp;&nbsp;
              <span className={styles.releaseDateBefore}>
                &#xB7; &nbsp;
                {checkMediaType(
                  "releaseDate",
                  mostTrending.media_type,
                  mostTrendingInfo
                )}
              </span>
            </Text>
          </Flex>
          <Box pt={4}>
            {mostTrendingInfo.tagline ? (
              <q
                style={{
                  fontSize: "2vw",
                  fontStyle: "italic",
                  verticalAlign: "baseline",
                  opacity: "0.75",
                  lineHeight: "1.25",
                }}
              >
                {mostTrendingInfo.tagline}
              </q>
            ) : null}
          </Box>
          <SimpleGrid columns={2}>
            <GridItem colSpan={1}>
              <Flex mt={8}>
                <Wrap spacing="1.25vw">
                  <Cast castData={castData} />
                </Wrap>
              </Flex>
            </GridItem>
            <GridItem colSpan={1}>
              <Box>
                <p
                  style={{
                    textAlign: "left",
                    marginTop: "2vh",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "1.75",
                  }}
                >
                  {mostTrending.overview}
                </p>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Box>
        <Tabs variant="enclosed" mt={8}>
          <TabList>
            <Tab>
              Videos (
              {mostTrendingVideos.length > mediaMax
                ? mediaMax
                : mostTrendingVideos.length}
              )
            </Tab>
            <Tab>
              Images (
              {mostTrendingImages.posters.length > mediaMax
                ? mediaMax
                : mostTrendingImages.length}
              )
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex mt={8} justify="center">
                <Wrap spacing="2vw">
                  {randElems
                    .getRandElems(mostTrendingVideos, mediaMax)
                    .map((embbededId) => (
                      <WrapItem key={embbededId}>
                        <EmbeddedYT embeddedKey={embbededId} />
                      </WrapItem>
                    ))}
                </Wrap>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex mt={8} justify="center">
                <Wrap spacing="2vw">
                  {randElems
                    .getRandElemsFilter(
                      mostTrendingImages.posters,
                      mediaMax,
                      "iso_639_1",
                      "en" || "fr"
                    )
                    .map((img) => (
                      <WrapItem key={img.file_path.split("/")[1].split(".")[0]}>
                        <Image
                          src={`https://image.tmdb.org/t/p/w200${img.file_path}`}
                          fallbackSrc={"/noMoviePoster.jpg"}
                          alt={img.file_path}
                          className={styles.responsiveImg}
                        />
                      </WrapItem>
                    ))}
                </Wrap>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  }
};

export default MTrending;
