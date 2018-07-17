const propertyBuilder = require('./property-builder');

// const shouldApplyOverride = (field, overrides) => Object.keys(overrides).includes(field);

class Fixture {
  constructor(...fieldBuilders){
    this.instanceIncrementer = 1;
    this.builders = fieldBuilders;
  }
  create(overrides = {}) {
    const fixture = {};
    this.builders.forEach((builder) => {
      let { propName, propValue } = propertyBuilder
        .buildFixtureProperty(builder, this.instanceIncrementer);
      console.log({propName, propValue});

      if (overrides[propName]) {
        fixture[propName] = overrides[propName];
      } else {
        fixture[propName] = propValue;
      }
    });
    this.instanceIncrementer++;
    console.log({ fixture });
    return fixture;
  }
}
module.exports = Fixture;