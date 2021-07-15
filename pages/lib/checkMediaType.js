const checkMediaType = (useCase, queryType, data) => {
  switch (useCase) {
    case "href":
      return queryType === "movie" || queryType === "tv"
        ? "/movies/[movie]"
        : "/casts/[cast]";
    case "as":
      return queryType === "movie" || queryType === "tv"
        ? `/movies/${data.id}`
        : `/casts/${data.id}`;
    case "title":
      return queryType === "movie" ? `${data.title}` : `${data.name}`;
    case "desc":
      return queryType === "movie" || queryType === "tv"
        ? `${data.overview}`
        : `${data.known_for_department}`;
    case "imgSrc":
      return queryType === "movie" || queryType === "tv"
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : `https://image.tmdb.org/t/p/w500${data.profile_path}`;
  }
};

export default checkMediaType;
