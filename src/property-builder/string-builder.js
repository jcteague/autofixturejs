const { attachBuilderToString } = require('./utils');

const build = (name, increment) => {
  return `${name}${increment}`;
};
const constantBuilder = function(propValue){
  return () => ({
    propName: this,
    propValue,
  });
};
const withValueBuilder = function(propValue){
  return (incrementer) => ({
    propName: this,
    propValue: `${propValue}${incrementer}`
  })
};
attachBuilderToString('asConstant', constantBuilder);
attachBuilderToString('withValue', withValueBuilder);
module.exports = {buildStringProperty: build};