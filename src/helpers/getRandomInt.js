export const getRandomInt = () => {
  const maxLimit = 9999999999 * 99999999999;
  return Math.floor(Math.random() * Math.floor(maxLimit));
};
