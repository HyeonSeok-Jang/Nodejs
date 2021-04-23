const { odd, even } = require('./var');

module.exports = (num) => {
  num = num.toFixed(0);
  console.log(num);
  if (num % 2) {
    return odd;
  }
  return even;
};
