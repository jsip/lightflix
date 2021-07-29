const checkMediaType = (useCase, queryType, data) => {
  switch (useCase) {
    case "href":
      if (queryType === "movie") {
        return "/movies/[movie]";
      } else if (queryType === "tv") {
        return "/shows/[show]";
      } else if (queryType === "person") {
        return "/casts/[cast]";
      } else if (queryType === "genre") {
        return "/genres/[genre]";
      }

    case "as":
      if (queryType === "movie") {
        return `/movies/${data.id}`;
      } else if (queryType === "tv") {
        return `/shows/${data.id}`;
      } else if (queryType === "person") {
        return `/casts/${data.id}`;
      } else if (queryType === "genre") {
        return `/genres/${data.id}`;
      }

    case "title":
      return queryType === "movie" ? `${data.title}` : `${data.name}`;

    case "desc":
      return queryType === "movie" || queryType === "tv"
        ? `${data.overview}`
        : `${data.known_for_department}`;

    case "imgSrc":
      if (queryType === "movie" || queryType === "tv") {
        return !data.poster_path
          ? undefined
          : `https://image.tmdb.org/t/p/w500${data.poster_path}`;
      } else {
        return !data.profile_path
          ? undefined
          : `https://image.tmdb.org/t/p/w500${data.profile_path}`;
      }

    case "imgSrcBackdrop":
      if (queryType === "movie" || queryType === "tv") {
        return !data.poster_path
          ? undefined
          : `https://image.tmdb.org/t/p/original${data.backdrop_path}`;
      } else {
        return !data.profile_path
          ? undefined
          : `https://image.tmdb.org/t/p/w500${data.profile_path}`;
      }

    case "runtime":
      return queryType === "movie" ? data.runtime : data.episode_run_time;

    case "releaseDate":
      if (data.release_date) {
        return data.release_date.split("-")[0];
      } else if (data.first_air_date) {
        return data.first_air_date.split("-")[0];
      }
  }
};

export default checkMediaType;
