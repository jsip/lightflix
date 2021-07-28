const getRandElems = (arr, maxSlice) =>
  arr.sort(() => Math.random() - Math.random()).slice(0, maxSlice);

const getRandElemsFilter = (arr, maxSlice, filterKey, filterVal) => {
  let newArr = arr
    .sort(() => Math.random() - Math.random())
    .filter((p) => p[filterKey] === filterVal)
    .slice(0, maxSlice);
  return [newArr, newArr.length];
};

const randElems = { getRandElems, getRandElemsFilter };
export default randElems;
