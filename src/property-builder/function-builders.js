const { attachBuilderToString } = require('./utils');

asFunctionBuilder = function(builder){
  console.log({'as builder': this});
  const propName = this;
  return function(increment){
    return {
      propName,
      propValue: builder(increment),
    };
  };
};
attachBuilderToString('as', asFunctionBuilder);