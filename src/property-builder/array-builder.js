const { attachBuilderToString } = require('./utils');
const createArray = (val, length) => {
  const arr = [];
  for(let i = 1; i < length+1; i++) {
    arr.push(`${val}${i}`)
  }
  return arr;
};
const arrayBuilder = function(arrayLength) {
  const propName = this;
  return function(increment){
    return {
      propName,
      propValue: createArray(propName, arrayLength)
    };
  }
};
attachBuilderToString('asArray', arrayBuilder);