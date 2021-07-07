import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
import fetchMovies from "../lib/fetchMovies";
import { API_KEY } from "../utils/constants";

const XSMovieCard = ({ query, clickHandler }) => {
  const [queryData, setQueryData] = useState(query);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=`;
  console.log(queryData);
  // if (_movies === null) {
  //   return "No movies found";
  // } else if (_movies === "Empty query, ignoring.") {
  //   return "";
  // } else {
  //   const moviesComp = _movies.results.map((movie) => {
  //     return (
  //       <div
  //         key={movie.id}
  //         style={{
  //           marginBottom: "4rem",
  //           display: "grid",
  //           gridGap: "1rem",
  //           gridTemplateColumns: "repeat(auto-fit, minmax(45vh, 1fr))",
  //         }}
  //         onClick={clickHandler}
  //       >
  //         <div>
  //           <Image
  //             src={
  //               movie.poster_path
  //                 ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  //                 : "https://upload.wikimedia.org/wikipedia/en/9/9a/Scooby-gang-1969.jpg"
  //             }
  //             alt=""
  //             style={{ borderRadius: "10px", width: "40vh", height: "auto" }}
  //           />
  //         </div>
  //         <div
  //           style={{
  //             textAlign: "left",
  //             display: "flex",
  //             alignItems: "center",
  //           }}
  //         >
  //           <div style={{ marginLeft: "4rem" }}>
  //             <h3>{movie.title}</h3>
  //             <p>{movie.overview}</p>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  //   return moviesComp || " | null";
  // }
  return queryData;
};

export default XSMovieCard;
