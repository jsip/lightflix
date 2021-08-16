import {
  Box,
  Center,
  Flex,
  Heading,
  Img,
  Link,
  Spacer,
  Tag,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import lang from "../api/routeri18n";
import checkMediaType from "../lib/checkMediaType";
import fetchData from "../lib/fetchData";
import API_KEY from "../utils/constants";

const SCards = ({ query, clickHandler }) => {
  let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${lang}&query=`;
  const [searchData, setSearchData] = useState();
  useEffect(() => {
    if (query) {
      fetchData(url, query).then((m) => setSearchData(m));
    }
  }, [query, url]);

  if (!searchData || !query) {
    return null;
  } else if (searchData?.results?.length === 0) {
    return "Essayez peut-être quelque chose d'autre?";
  } else {
    return searchData?.results.map((data) => (
      <div
        key={data.id}
        style={{
          height: "35vh",
          marginBottom: "1em",
        }}
        onClick={clickHandler}
      >
        <NextLink
          href={checkMediaType("href", data.media_type, data)}
          as={checkMediaType("as", data.media_type, data)}
        >
          <Link>
            <Flex color="white">
              <Center>
                <Img
                  src={checkMediaType("imgSrc", data.media_type, data)}
                  fallbacksrc={"/noMoviePoster.jpg"}
                  alt=""
                  style={{
                    borderRadius: "10px",
                    width: "10vw",
                    height: "30vh",
                    verticalAlign: "middle",
                  }}
                />
              </Center>
              <Box
                style={{
                  textAlign: "left",
                  color: "black",
                  paddingLeft: "2vw",
                  width: "25vw",
                }}
              >
                <Flex mb={8}>
                  <Heading size="md" pt={2} mr={8}>
                    {checkMediaType("title", data.media_type, data)}
                  </Heading>
                  <Spacer />
                  <Tag textTransform="capitalize">{data.media_type}</Tag>
                </Flex>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
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
  }
};

export default SCards;
