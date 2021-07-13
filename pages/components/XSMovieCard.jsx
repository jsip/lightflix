import React, { useEffect, useState } from "react";
import { Image, Link, Flex } from "@chakra-ui/react";
import fetchMovies from "../lib/fetchMovies";
import { API_KEY } from "../utils/constants";
import NextLink from "next/link";

const XSMovieCard = ({ query, clickHandler }) => {
  console.log(query);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
  const [movieData, setMovieData] = useState();
  useEffect(() => {
    if (query) {
      fetchMovies(url, query).then((m) => setMovieData(m));
    }
  }, [query, url]);

  if (!movieData || !query) {
    return null;
  } else {
    return movieData?.results.map((movie) => (
      <div
        key={movie.id}
        style={{
          marginBottom: "4rem",
          maxWidth: "10%",
        }}
        onClick={clickHandler}
      >
        <NextLink href="/movies/[movie]" as={`/movies/${movie.id}`}>
          <Link>
            <Flex>
              <Image
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://upload.wikimedia.org/wikipedia/en/9/9a/Scooby-gang-1969.jpg"
                }
                alt=""
                style={{ borderRadius: "10px", width: "10vh", height: "auto" }}
              />
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </div>
            </Flex>
          </Link>
        </NextLink>
      </div>
    ));
  }
};

export default XSMovieCard;
