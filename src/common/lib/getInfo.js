import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

// movie, tv, person

const getInfo = async (Id, mediaType) =>
  await fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${Id}?api_key=${API_KEY}&language=en-US`
  );

export default getInfo;
