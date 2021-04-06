import fetch from 'node-fetch';

const utils = {
  // check if all values in an array are equal
  allEqual: (array) => array.every((value) => value === array[0]),

  // retrieves the redirect url corresponding to a url that gets redirected
  getRedirectUrl: async (originalUrl) => (await fetch(originalUrl))?.url || originalUrl,

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, index) => min + index),

  // shuffle the elements in an array in place
  shuffle: (array) => {
    for (let index = array.length - 1; index > 0; index--) {
      const newIndex = Math.floor(Math.random() * (index + 1));
      [array[index], array[newIndex]] = [array[newIndex], array[index]];
    }

    return array;
  },

  // Sum an array
  sum: (array) => array.reduce((accumulator, current) => accumulator + current, 0),
};

export default utils;
