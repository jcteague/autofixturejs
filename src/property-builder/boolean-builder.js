const { attachBuilderToString } = require('./utils');

const boolBuilder = function(){
  const propName = this;
  return function(increment) {
    return {
      propName,
      propValue: Math.floor(Math.random()*2)?true:false,
    };
  }
}
attachBuilderToString('asBoolean', boolBuilder)