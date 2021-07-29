import getGenre from "./getGenre";

const convertGenres = async (mediaType, genreIds) => {
  let convertedGenres = [];
  if (mediaType === "person") return [];
  return getGenre.genres().then((genres) => {
    if (typeof genreIds === "string") {
      return (convertedGenres = genres.filter((genre) => {
        return genre.id === parseInt(genreIds) ? genre : null;
      }));
    } else {
      for (let g of genreIds) {
        genres.find((genre) =>
          genre.id === g
            ? (convertedGenres = [...convertedGenres, genre])
            : null
        );
      }
      return convertedGenres.splice(0, 3);
    }
  });
};

export default convertGenres;
