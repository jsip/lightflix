const Val = (obj) =>
  new Promise((resolve) =>
    resolve(obj.reduce((a, b) => (a.popularity > b.popularity ? a : b)))
  );

const Vals = (array, amount) =>
  new Promise((resolve) => {
    let arr = [];
    array.sort((a, b) => (a.popularity > b.popularity ? 1 : -1));
    for (let i = 0; i < array.length; i++) {
      arr.unshift(array[i]);
    }
    resolve(arr.slice(0, amount));
  });

export { Val, Vals };

const getBiggest = { Val, Vals };
export default getBiggest;
