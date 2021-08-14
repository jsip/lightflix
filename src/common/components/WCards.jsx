import { Heading, Img, Link, Wrap, WrapItem, Badge } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useEffect, useState } from "react";
import checkMediaType from "../lib/checkMediaType";
import getBiggest from "../utils/getBiggest";
import getWork from "../lib/getWork";
import verifyMediaType from "../lib/verifyMediaType";
import convertGenres from "../lib/convertGenres";

const WCards = ({ castWork }) => {
  const cardsToDisplay = 4;
  const [recommendedMovies, setRecommendedMovies] = useState();
  const [genreArray, setGenreArray] = useState([]);
  useEffect(() => {
    let _genres = [];

    for (let w of castWork) {
      _genres.push(...w.genre_ids);
    }

    const genres = _genres.reduce(
      (acum, cur) => Object.assign(acum, { [cur]: (acum[cur] || 0) + 1 }),
      {}
    );

    const key = Object.keys(genres)
      .sort((a, b) => genres[b] - genres[a])
      .slice(0, cardsToDisplay);

    convertGenres("movie/tv", key, 4).then((gen) => setGenreArray(gen));

    getBiggest.Vals(castWork, cardsToDisplay, "popularity").then((vals) => {
      vals = verifyMediaType(vals);
      setRecommendedMovies(vals);
    });
  }, [castWork]);
  if (!recommendedMovies || !genreArray) {
    return null;
  } else {
    return (
      <div>
        <Heading mb={4} fontSize="3xl">
          Notable Genres
        </Heading>
        {genreArray
          ? genreArray.map((genre) => {
              return (
                <NextLink
                  key={genre.id}
                  href={checkMediaType("href", "genre", genre)}
                  as={checkMediaType("as", "genre", genre)}
                >
                  <Link>
                    <Badge verticalAlign="baseline" mr={2}>
                      {genre.name}
                    </Badge>
                  </Link>
                </NextLink>
              );
            })
          : null}
        <Heading mb={6} mt={6} fontSize="3xl">
          Famous Roles
        </Heading>
        <Wrap direction="row" justify="left" spacing="2vw">
          {recommendedMovies?.map((movie, i) => (
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
        </Wrap>
      </div>
    );
  }
};

export default WCards;
