import {
  Box, Center, Flex,
  Heading, Image, Link, Spacer,
  Tag
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import checkMediaType from "../lib/checkMediaType";

const TCard = ({ trendingData }) => {
  if (!trendingData) {
    return null;
  } else {
    return (
      trendingData?.results.map((data) => (
        <div
          key={data.id}
          style={{
            height: "12vh",
            width: "inherit",
            marginBottom: "1em",
          }}
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
                    <Heading size="sm">
                      {checkMediaType("title", data.media_type, data)}
                    </Heading>
                    <Spacer />
                    <Tag textTransform="capitalize">{data.media_type}</Tag>
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
      )) || null
    );
  }
};

export default TCard;
