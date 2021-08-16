import {
  Badge,
  Box,
  Flex,
  Heading,
  Img,
  Link,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import NextLink from "next/link";
import React from "react";
import styles from "../../styles/Home.module.scss";
import checkMediaType from "../lib/checkMediaType";
import formatRuntime from "../utils/formatRuntime";
import Cast from "./Cast";
import Media from "./Media";

const MTrending = ({
  mostTrending,
  mostTrendingInfo,
  mainGenres,
  mostTrendingVideos,
  mostTrendingImages,
  castData,
}) => {
  const mediaMax = 3;
  if (
    !mostTrending ||
    !mainGenres ||
    !castData ||
    !mostTrendingVideos ||
    !mostTrendingImages ||
    !mostTrendingInfo
  ) {
		return null;
  } else {
    console.log(mostTrending);
    return (
      <div>
        <div style={{ position: "relative" }}>
          <NextLink
            href={checkMediaType("href", mostTrending.media_type, mostTrending)}
            as={checkMediaType("as", mostTrending.media_type, mostTrending)}
          >
            <Link>
              <Img
                src={checkMediaType(
                  "imgSrcBackdrop",
                  mostTrending.media_type,
                  mostTrending,
                  "original"
                )}
                fallbacksrc={"/noMoviePoster.jpg"}
                alt=""
                borderRadius="25px"
              ></Img>
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
            </Link>
          </NextLink>
        </div>
        <Box columns={1} mt={12}>
          <Flex mt={8}>
            <Box>
              {mainGenres
                ? mainGenres.map((genre) => (
                    <NextLink
                      key={genre.id}
                      href={checkMediaType("href", "genre", genre)}
                      as={checkMediaType("as", "genre", genre)}
                    >
                      <Link>
                        <Badge verticalAlign="baseline" key={genre.id} mr={2}>
                          {genre.name}
                        </Badge>
                      </Link>
                    </NextLink>
                  ))
                : null}
            </Box>
            {mostTrending.media_type === "tv" ||
            mostTrending.media_type === "movie" ? (
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
                {mostTrending.media_type === "tv" ? " (per episode)" : null}
                &nbsp;&nbsp;
                <span className={styles.releaseDateBefore}>
                  <span style={{}}>&#xB7;</span>
                  &nbsp;
                  {checkMediaType(
                    "releaseDate",
                    mostTrending.media_type,
                    mostTrendingInfo
                  )}
                </span>
              </Text>
            ) : null}
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
          <Flex>
            <Box minWidth="max-content" mr={8}>
              <Flex mt={12}>
                <Wrap spacing="1.25vw">
                  {mostTrending.media_type === "tv" ||
                  mostTrending.media_type === "movie" ? (
                    <Cast castData={castData} returnDesc={false} />
                  ) : null}
                </Wrap>
              </Flex>
            </Box>
            <Box>
              <Box>
                <p
                  style={{
                    textAlign: "justify",
                    marginTop: "2vh",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineHeight: "2",
                  }}
                >
                  {mostTrending.overview}
                </p>
              </Box>
            </Box>
          </Flex>
        </Box>
        {mostTrending.media_type === "tv" ||
        mostTrending.media_type === "movie" ? (
          <Media
            mostTrendingImages={mostTrendingImages}
            mostTrendingVideos={mostTrendingVideos}
          />
        ) : null}
      </div>
    );
  }
};

export default MTrending;
