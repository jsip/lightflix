import lang from "../api/routeri18n";
import API_KEY from "../utils/constants";
import fetchData from "./fetchData";

const work = async (Id) => {
  if (Id) {
    const movieList = await fetchData(
      `https://api.themoviedb.org/3/person/${Id}/movie_credits?api_key=${API_KEY}&language=${lang}`
    );
    const tvList = await fetchData(
      `https://api.themoviedb.org/3/person/${Id}/tv_credits?api_key=${API_KEY}&language=${lang}`
    );
    const workList = [...movieList.cast, ...tvList.cast];
    return workList;
  }
};

const creditInfo = async (creditId) =>
  await fetchData(
    `https://api.themoviedb.org/3/credit/${creditId}?api_key=${API_KEY}&language=${lang}`
  );

const getWork = { work, creditInfo };

export default getWork;
