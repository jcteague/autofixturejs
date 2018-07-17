const FixtureBuilder = require('./fixture-builder');
const fixtureBuilders = {};
const define = (name, builders) => {
  if(fixtureBuilders[name]) {
    throw new Error(`fixture already defined for ${name}`);
  }
  fixtureBuilders[name] = new FixtureBuilder(builders);
  return fixtureBuilders[name];
};

module.exports = {
  define,
};
