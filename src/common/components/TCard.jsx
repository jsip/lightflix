import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Spacer,
  Tag,
  IconButton,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import React, { useState, useEffect } from "react";
import checkMediaType from "../lib/checkMediaType";

const TCard = ({ trendingData, cardHover }) => {
  const [trendingCards, setTrendingCards] = useState();
  const [trendingDataCursor, setTrendingDataCursor] = useState(10);
  useEffect(() => {
    if (trendingData) {
      let tData = trendingData.slice(
        0,
        trendingData.length - trendingDataCursor
      );
      console.log(tData);
      setTrendingCards(tData);
    }
  }, [trendingData, trendingDataCursor]);
  if (!trendingCards) {
    return null;
  } else {
    const cards = trendingCards.map((data) => (
      <div
        key={data.id}
        style={{
          height: "12vh",
          width: "inherit",
          marginBottom: "1em",
        }}
        onMouseOver={() => cardHover(data)}
      >
        <NextLink
          href={checkMediaType("href", data.media_type, data)}
          as={checkMediaType("as", data.media_type, data)}
        >
          <Link>
            <Flex color="white">
              <Center>
                <Image
                  src={checkMediaType("imgSrc", data.media_type, data)}
                  fallbackSrc={"/noMoviePoster.jpg"}
                  alt=""
                  style={{
                    borderRadius: "10px",
                    width: "4vw",
                    height: "12vh",
                    verticalAlign: "middle",
                  }}
                />
              </Center>
              <Box
                style={{
                  textAlign: "left",
                  color: "black",
                  paddingLeft: "1vw",
                  width: "15vw",
                }}
              >
                <Flex mb={2}>
                  <Box>
                    <Heading size="sm">
                      {checkMediaType("title", data.media_type, data)}
                    </Heading>
                  </Box>
                  <Spacer />
                  <Box verticalAlign="middle">
                    <Tag
                      textTransform="capitalize"
                      width="min-content"
                      height="min-content"
                      textAlign="center"
                    >
                      {data.media_type}
                    </Tag>
                  </Box>
                </Flex>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {checkMediaType("desc", data.media_type, data)}
                </p>
              </Box>
            </Flex>
          </Link>
        </NextLink>
      </div>
    ));
    return cards;
  }
};

export default TCard;
