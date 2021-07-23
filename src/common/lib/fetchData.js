const fetchData = async (url, query) => {
  let data;
  if (query) {
    const res = await fetch(`${url}${query}`);
    data = await res.json();
  } else {
    const res = await fetch(`${url}`);
    data = await res.json();
  }
  return data;
};

export default fetchData;
