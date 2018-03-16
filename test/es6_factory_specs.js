/**
 * Created by jcteague on 10/29/17.
 */
require("should");
var factory = require("../AutoFixture");

describe('es6 factory specs', () => {
  it('should create a fixture builder as module', ()=>{
    const fixture = factory.define('user',[
      'firstName',
      'lastName'
    ]);
    fixture.should.be.function;

  })
  it('should be able to use the result from a fixture definition to create a fixture', () => {
    const builder = factory.define('user', ['firstName', 'lastName']);
    console.log(builder);
    const fixture = builder.create();
    console.log(fixture)
    fixture.should.have.property('firstName')
  })
});