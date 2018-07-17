const { attachBuilderToString } = require('./utils');
const fromFixtureBuilder = function(fixtureBuilder) {
  const propName = this;
  return (incrementer) => {
    const propValue = fixtureBuilder.create();
    return{
      propName,
      propValue
    }
  }
};
attachBuilderToString('fromFixture', fromFixtureBuilder);