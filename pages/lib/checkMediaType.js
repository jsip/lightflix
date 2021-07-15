const checkMediaType = (useCase, queryType, data) => {
  switch (useCase) {
    case "href":
      if (queryType === "movie") {
        return "/movies/[movie]";
      } else if (queryType === "tv") {
        return "/shows/[show]";
      } else {
        return "/casts/[cast]";
      }
    case "as":
      if (queryType === "movie") {
        return `/movies/${data.id}`;
      } else if (queryType === "tv") {
        return `/shows/${data.id}`;
      } else {
        return `/casts/${data.id}`;
      }
    case "title":
      return queryType === "movie" ? `${data.title}` : `${data.name}`;
    case "desc":
      return queryType === "movie" || queryType === "tv"
        ? `${data.overview}`
        : `${data.known_for_department}`;
    case "imgSrc":
      return queryType === "movie" || queryType === "tv"
        ? !data.poster_path ? undefined : `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : !data.profile_path ? undefined : `https://image.tmdb.org/t/p/w500${data.profile_path}`;
  }
};

export default checkMediaType;
