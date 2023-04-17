const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('arr parameter must be an instance of the Array!');
  }

  let result = [];
  let discardNext = false;
  let discardPrev = false;
  let doubleNext = false;
  let doublePrev = false;

  for (let i = 0; i < arr.length; i++) {
    if (discardNext) {
      discardNext = false;
      continue;
    }
    if (discardPrev) {
      result.pop();
      discardPrev = false;
    }
    if (doubleNext) {
      result.push(arr[i]);
    }
    result.push(arr[i]);
    if (doublePrev) {
      result.push(arr[i]);
    }
    doubleNext = false;
    doublePrev = false;
    switch (arr[i]) {
      case '--discard-next':
        discardNext = true;
        break;
      case '--discard-prev':
        discardPrev = true;
        break;
      case '--double-next':
        doubleNext = true;
        break;
      case '--double-prev':
        doublePrev = true;
        break;
      default:
        break;
    }
  }
  return result;
}


module.exports = {
  transform
};
