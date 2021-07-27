import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Image,
  SimpleGrid,
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

const MTrending = ({
  mostTrending,
  mainGenres,
  mostTrendingVideos,
  mostTrendingImages,
}) => {
  const mediaMax = 3;
  if (
    !mostTrending ||
    !mainGenres ||
    !mostTrendingVideos ||
    !mostTrendingImages
  ) {
    return null;
  } else {
    console.log(mostTrendingImages);
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
        <SimpleGrid columns={2} mt={8}>
          <Box>
            <Flex>
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
                &nbsp;&nbsp;2hrs & 35min
              </Text>
            </Flex>
            <Flex mt={4}>
              <Wrap spacing="1.25vw">
                <WrapItem>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                </WrapItem>
                <WrapItem>
                  <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
                </WrapItem>
                <WrapItem>
                  <Avatar
                    name="Ryan Florence"
                    src="https://bit.ly/ryan-florence"
                  />
                </WrapItem>
                <WrapItem>
                  <Avatar
                    name="Prosper Otemuyiwa"
                    src="https://bit.ly/prosper-baba"
                  />
                </WrapItem>
                <WrapItem>
                  <Avatar
                    name="Christian Nwamba"
                    src="https://bit.ly/code-beast"
                  />
                </WrapItem>
                <WrapItem>
                  <Avatar
                    name="Segun Adebayo"
                    src="https://bit.ly/sage-adebayo"
                  />
                </WrapItem>
              </Wrap>
            </Flex>
          </Box>
          <Box>
            <p
              style={{
                textAlign: "left",
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
        </SimpleGrid>
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
              {mostTrendingVideos.length > mediaMax
                ? mediaMax
                : mostTrendingVideos.length}
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
