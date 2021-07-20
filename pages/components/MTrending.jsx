import React from "react";
import { Heading, Image, Text, Flex, Spacer, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import checkMediaType from "../lib/checkMediaType";

const MTrending = ({ mostTrending }) => {
  if (!mostTrending) {
    return null;
  } else {
    return (
      <div>
        <div style={{ position: "relative" }}>
          <Image
            src={`https://image.tmdb.org/t/p/original${mostTrending.backdrop_path}`}
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
        <Flex mt={8}>
          <Heading size="md" pt={2} mr={8}>Cast</Heading>
          <Wrap>
            <WrapItem>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </WrapItem>
            <WrapItem>
              <Avatar
                name="Kola Tioluwani"
                src="https://bit.ly/tioluwani-kolawole"
              />
            </WrapItem>
            <WrapItem>
              <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            </WrapItem>
            <WrapItem>
              <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            </WrapItem>
            <WrapItem>
              <Avatar
                name="Prosper Otemuyiwa"
                src="https://bit.ly/prosper-baba"
              />
            </WrapItem>
            <WrapItem>
              <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
            </WrapItem>
            <WrapItem>
              <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            </WrapItem>
          </Wrap>
        </Flex>
      </div>
    );
  }
};

export default MTrending;
