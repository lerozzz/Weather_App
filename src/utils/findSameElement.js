const getSameElement = (findEl, list) => {
  //   console.log(findEl, list);
  const result = list.find((el) => el.name === findEl.name);
  return !!result;
};
export default getSameElement;
