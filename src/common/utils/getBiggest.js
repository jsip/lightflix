const Val = (obj, param) =>
  new Promise((resolve) =>
    resolve(obj.reduce((a, b) => (a[param] > b[param] ? a : b)))
  );

const Vals = (array, amount, param) =>
  new Promise((resolve) => {
    let arr = [];
    array.sort((a, b) => (a[param] > b[param] ? 1 : -1));
    for (let i = 0; i < array.length; i++) {
      arr.unshift(array[i]);
    }
    resolve(arr.slice(0, amount));
  });

export { Val, Vals };

const getBiggest = { Val, Vals };
export default getBiggest;
