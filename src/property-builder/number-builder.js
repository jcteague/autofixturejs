const { attachBuilderToString } = require('./utils');
const builder = function() {
  return propValue => ({
    propName: this,
    propValue,
  });
};
attachBuilderToString('asNumber', builder);