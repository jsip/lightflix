const getRandElems = (arr, maxSlice) =>
  arr.sort(() => Math.random() - Math.random()).slice(0, maxSlice);

const getRandElemsFilter = (arr, maxSlice, filterKey, filterVal) => {
  let newArr;
  if (!arr || arr.length === 0) {
    return [arr, arr.length];
  } else {
    newArr = arr
      .sort(() => Math.random() - Math.random())
      .filter((p) => p[filterKey] === filterVal)
      .slice(0, maxSlice);
    return [newArr, newArr.length];
  }
};

const getRandElemsIncludes = (arr, maxSlice, containKey, containVal) => {
  if (arr.length === 0) {
    return [...arr, arr.length];
  }
  let newArr = arr
    .sort(() => Math.random() - Math.random())
    .filter((p) => p[containKey].includes(containVal))
    .slice(0, maxSlice);
  return [newArr, newArr.length];
};

const randElems = { getRandElems, getRandElemsFilter, getRandElemsIncludes };
export default randElems;
