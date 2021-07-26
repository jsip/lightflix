import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getPopularPeople = async () => {
  const popularPeople = await fetchData(
    `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en-US`
  );
  console.log(popularPeople);
  return popularPeople;
};

export default getPopularPeople;
