import React from "react";
import {
  Heading,
  Image,
  Text,
  Flex,
  Spacer,
  Wrap,
  WrapItem,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  Badge,
  StatHelpText,
  SimpleGrid,
  Stack,
  Divider,
  Box,
} from "@chakra-ui/react";
import checkMediaType from "../lib/checkMediaType";

const MTrending = ({ mostTrending, mainGenres }) => {
  if (!mostTrending || !mainGenres) {
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
              }}
            >
              {mostTrending.overview}
            </p>
          </Box>
        </SimpleGrid>
      </div>
    );
  }
};

export default MTrending;
