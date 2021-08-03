import { Heading, Img, Link, Wrap, WrapItem, Badge } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import checkMediaType from "../lib/checkMediaType";
import getBiggest from "../utils/getBiggest";
import getWork from "../lib/getWork";
import verifyMediaType from "../lib/verifyMediaType";
import convertGenres from "../lib/convertGenres";

const WCards = ({ Id }) => {
  const cardsToDisplay = 4;
  const [recommendedMovies, setRecommendedMovies] = useState();
  const [notableGenres, setNotableGenres] = useState();
  useEffect(() => {
    getWork.work(Id).then(async (work) => {
      let _genres = [];
      for (let w of work) {
        _genres.push(...w.genre_ids);
      }
      const genres = _genres.reduce(
        (acum, cur) => Object.assign(acum, { [cur]: (acum[cur] || 0) + 1 }),
        {}
      );
      () => {
        let genresArray = [];
        Object.keys(genres)
          .sort((a, b) => genres[b] - genres[a])
          .slice(0, cardsToDisplay)
          .map(async (key) => {
            let g = await convertGenres("movie/tv", key, 1).then((g) => g);
            let gName = [
              {
                key: g[0].name,
                id: parseInt(key),
              },
            ];
            genresArray.push(gName);
          });
        setNotableGenres(genresArray);
      };
      getBiggest.Vals(work, cardsToDisplay, "popularity").then((vals) => {
        console.log(vals);
        vals = verifyMediaType(vals);
        setRecommendedMovies(vals);
      });
    });
  }, [Id]);
  if (!recommendedMovies) {
    return null;
  } else {
    return (
      <div>
        <Heading mb={6} mt={6} fontSize="3xl">
          Famous Roles
        </Heading>
        <Wrap direction="row" justify="left" spacing="2vw">
          {recommendedMovies.map((movie, i) => (
            <div key={i}>
              <WrapItem>
                <div style={{ position: "relative" }}>
                  <NextLink
                    href={checkMediaType("href", movie.media_type, movie)}
                    as={checkMediaType("as", movie.media_type, movie)}
                  >
                    <Link>
                      <Img
                        src={checkMediaType(
                          "imgSrc",
                          movie.media_type,
                          movie,
                          "w200"
                        )}
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
                        {checkMediaType("title", movie.media_type, movie)}
                      </Heading>
                    </Link>
                  </NextLink>
                </div>
              </WrapItem>
            </div>
          ))}
          <Heading mb={6} fontSize="3xl">
            Notable Genres
          </Heading>
          {notableGenres
            ? notableGenres.map((genre) => {
                console.log(genre[0].id, genre[0].key);
                if (!genre) {
                  return null;
                } else {
                  return (
                    <NextLink
                      key={genre[0].id}
                      href={checkMediaType("href", "genre", genre[0])}
                      as={checkMediaType("as", "genre", genre[0])}
                    >
                      <Link>
                        <Badge
                          verticalAlign="baseline"
                          mr={2}
                          key={genre[0].id}
                        >
                          {genre[0].key}
                        </Badge>
                      </Link>
                    </NextLink>
                  );
                }
              })
            : null}
        </Wrap>
      </div>
    );
  }
};

export default WCards;
