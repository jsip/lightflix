import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const getCast = async (Id, mediaType) =>
  await fetchData(
    `https://api.themoviedb.org/3/${mediaType}/${Id}/credits?api_key=${API_KEY}&language=en-US`
  );

export default getCast;
