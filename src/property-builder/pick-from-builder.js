const { attachBuilderToString } = require('./utils');

build = function(options=[]) {
  if(options.length === 0) {
    throw new Error('no options provided for pickFrom fixture')
  }
  const propName = this;
  return (incrementer) => ({
    propName,
    propValue: options[Math.floor(Math.random()*options.length)]
  })
};
attachBuilderToString('pickFrom', build);