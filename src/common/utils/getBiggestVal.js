const getBiggestVal = (obj) =>
  new Promise((resolve) =>
    resolve(obj.reduce((a, b) => (a.popularity > b.popularity ? a : b)))
  );

export default getBiggestVal;
