import getGenre from "./getGenre";

const convertGenres = async (mediaType, genreIds, genreAm) => {
  let convertedGenres = [];
  if (mediaType === "person") return [];
  return getGenre.genres().then((genres) => {
    if (typeof genreIds === "string") {
      return (convertedGenres = genres.filter((genre) => 
        genre.id === parseInt(genreIds) ? genre : null
      ));
    } else if (genreIds) {
      for (let g of genreIds) {
        genres.find((genre) =>
          genre.id === g
            ? (convertedGenres = [...convertedGenres, genre])
            : null
        );
      }
      return convertedGenres.splice(0, genreAm);
    }
  });
};

export default convertGenres;
