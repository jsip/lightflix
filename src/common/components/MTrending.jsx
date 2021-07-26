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

const MTrending = ({ mostTrending }) => {
  if (!mostTrending) {
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
        <SimpleGrid columns={2} spacing={10} mt={4}>
          <Box>
            <p
              style={{
                textAlign: "justify",
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
          <Box>
            <Flex>
              <Box>
                <Badge verticalAlign="baseline">Action</Badge>
                &nbsp; &nbsp;
                <Badge verticalAlign="baseline">Thriller</Badge>
              </Box>
              <Text>&nbsp;&nbsp;-&nbsp;&nbsp;2 Hours & 35 Minutes</Text>
            </Flex>
            <Flex mt={4}>
              <Wrap spacing="1vw">
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
        </SimpleGrid>
      </div>
    );
  }
};

export default MTrending;
