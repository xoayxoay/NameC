const timeOut = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  timeOut,
};
