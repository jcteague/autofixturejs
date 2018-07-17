const {buildStringProperty} = require('./string-builder');
require('./date-builder');
require('./number-builder');
require('./array-builder');
require('./email-builder');
require('./function-builders');
require('./boolean-builder');
require('./pick-from-builder');
require('./from-fixture-builder');


const buildFixtureProperty = (fixtureBuilder, increment) => {
  if (typeof fixtureBuilder === 'string') {
    const propValue = buildStringProperty(fixtureBuilder, increment);
    return {
      propName: fixtureBuilder,
      propValue,
    };
  } else if (typeof fixtureBuilder === 'function') {
    console.dir(fixtureBuilder);
    return fixtureBuilder(increment);
  } else {
    throw Error(`${typeof fixtureBuilder} is not supported`);
  }
};

module.exports = {
  buildFixtureProperty,
}