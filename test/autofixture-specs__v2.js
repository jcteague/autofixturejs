const factory = require('../');
const FixtureBuilder = require('../src/fixture-builder');
const should = require('should');
describe('v2', () =>{
describe('factory.define ', () => {
  let userFixture = factory.define('User', [
    'firstName',
    'lastName',
  ]);
  it('should create a fixture builder for the defined fixture', () => {
    userFixture.should.be.an.instanceOf(FixtureBuilder);
  });
  it('should only let you create one builder per name', () => {
    (()=>factory.define('User')).should.throw();
  })
});
});