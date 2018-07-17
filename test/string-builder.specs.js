require('should');
const {buildStringProperty} = require('../src/property-builder/string-builder');

describe('v2 string builder', () => {
  it('should create string with name and incrementer', () => {
    const val = buildStringProperty('property', 1);
    val.should.equal('property1');
  })
})