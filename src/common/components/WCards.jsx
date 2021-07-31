import { Heading, Img, Link, Wrap, WrapItem } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import checkMediaType from "../lib/checkMediaType";
import getBiggest from "../utils/getBiggest";
import getWork from "../lib/getWork";
import verifyMediaType from "../lib/verifyMediaType";

const WCards = ({ Id, mediaType }) => {
  const [recommendedMovies, setRecommendedMovies] = useState();
  useEffect(() => {
    getWork.work(Id).then((s) => {
      console.log(s);
      getBiggest.Vals(s, 6).then((vals) => {
        console.log(vals);
        console.log(verifyMediaType(vals));
        setRecommendedMovies(vals);
      });
    });
  }, [Id]);
  if (!recommendedMovies) {
    return null;
  } else
    return (
      <div>
        <Heading mb={6} mt={24}>
          Famous Roles
        </Heading>
        <Wrap direction="row" justify="center" spacing="2vw">
          {recommendedMovies.map((movie, i) => (
            <div key={i}>
              <WrapItem>
                <div style={{ position: "relative" }}>
                  <NextLink
                    href={checkMediaType("href", "movie", movie)}
                    as={checkMediaType("as", "movie", movie)}
                  >
                    <Link>
                      <Img
                        src={checkMediaType("imgSrc", mediaType, movie, "w200")}
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
                        {checkMediaType("title", mediaType, movie)}
                      </Heading>
                    </Link>
                  </NextLink>
                </div>
              </WrapItem>
            </div>
          ))}
        </Wrap>
      </div>
    );
};

export default WCards;
