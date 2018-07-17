
const sinon = require('sinon');
const FixtureBuilder = require('../src/fixture-builder');
const propertyBuilder = require('../src/property-builder');
const should = require('should');
let userFixture = new FixtureBuilder('userName', 'firstName');
describe('v2', () => {
describe('fixture builder', () => {
  it('should hold the field definitions', () => {
    userFixture.builders.should.have.lengthOf(2);
  });
  it('should hve an increment value of 0', () => userFixture.instanceIncrementer.should.equal(1));
});
  describe('builder.create', () => {
    it('the property builder for all fixture properties', () => {
      sinon.stub(propertyBuilder, 'buildFixtureProperty')
        .returns({propName: 'prop', 'propValue': 'value'});
      const fixture = userFixture.create();
      // console.log(propertyBuilder.buildFixtureProperty)
      propertyBuilder.buildFixtureProperty.callCount.should.equal(2);
      propertyBuilder.buildFixtureProperty.restore();
    });
    it('should use the override provided for the field', () => {
      const user = userFixture.create({firstName: 'Steve'});
      user.should.have.property('firstName', 'Steve');
    });
  });
  describe('for string fields', () => {
    it('uses the name of the field with the incrementer', () => {
        let fixtureBuilder = new FixtureBuilder('userName', 'firstName');
        const user = fixtureBuilder.create();
        user.should.have.property('firstName', 'firstName1');
    });
  });
  describe('withValue()', () => {
    it('increments the field with the value provided', () => {
      const fb = new FixtureBuilder('id'.withValue('id'));
      const f1  = fb.create();
      const f2 = fb.create();
      f1.id.should.equal('id1');
      f2.id.should.equal('id2');
    });
  });
  describe('asDate()', () => {
      it('should return a date for the property', () => {
          const fb = new FixtureBuilder('dateCreated'.asDate());
          const fixture = fb.create();
          fixture.should.have.property('dateCreated');
          fixture.dateCreated.should.be.an.instanceOf(Date);
      });
      it('should increment date field instances when specified', () => {
          const today = new Date();
          const fb = new FixtureBuilder('dateCreated'.asDate({incrementDay: true}));
          const f1 = fb.create();
          f1.dateCreated.getDate().should.equal(today.getDate());
          const f2 = fb.create();
          f2.dateCreated.getDate().should.equal(today.getDate()+1);
      });
  });
  describe('asNumber()', () => {
      it('should return a number incremented for each instance', () => {
        const fb = new FixtureBuilder('id'.asNumber());
        const f1  = fb.create();
        const f2 = fb.create();
        f1.id.should.equal(1);
        f2.id.should.equal(2);
      });
  });
  describe('asEmail()', () => {
    const fb = new FixtureBuilder('email'.asEmail());
    const f = fb.create();
    f.email.should.equal('email1@example.com');
  });
  describe('asBoolean()', () => {
    const fb = new FixtureBuilder('flag'.asBoolean());
    const f = fb.create();
    f.flag.should.be.an.instanceOf(Boolean);
  })
  describe('asConstant()', () => {
      it('uses the same value for all fields', () => {
        const fb = new FixtureBuilder('pi'.asConstant(3.14));
        const f1  = fb.create();
        const f2 = fb.create();
        f1.pi.should.equal(3.14);
        f2.pi.should.equal(3.14);
      });
  });
  describe('asArray()', () => {
      it('should create an array', () => {
        const fb = new FixtureBuilder('roles'.asArray(3));
        const f = fb.create();
        console.log(f);
        f.roles.should.be.an.instanceOf(Array);
        f.roles.length.should.equal(3);
        f.roles[0].should.equal('roles1');
      });
  });
  describe('as()', () => {
      it('uses the value returned from builder function param', () => {
        const field = 'field'.as(inc => `a${inc}`);
        const fb = new FixtureBuilder(field);
        const f1 = fb.create();
        f1.field.should.equal('a1');
        const f2 = fb.create();
        f2.field.should.equal('a2');
      });
  });
  describe('pickFrom', () => {
      it('throws and error if no options are provided', () => {
        (() => {
          const p = new FixtureBuilder('prop'.pickFrom())
        }).should.throw();
      });
      it('selects one of the options as a value', () => {
        const options =  [ 'a', 'b', 'c' ];
        const fb = new FixtureBuilder('prop'.pickFrom(options))
        const f = fb.create();
        options.includes(f.prop).should.be.true;
      });
  });
  describe('fromFixture()', () => {
      it('can create a property from another fixture', () => {
          const innerBuilder = new FixtureBuilder('a', 'b');
          const outerBuilder = new FixtureBuilder('c'.fromFixture(innerBuilder));
          const fixture = outerBuilder.create();
          fixture.should.have.property('c');
          fixture.c.should.eql({a: 'a1', b:'b1'});
      });

      it('uses an override for objects defined by a fixture', () => {
        const innerBuilder = new FixtureBuilder('a', 'b');
        const outerBuilder = new FixtureBuilder('c'.fromFixture(innerBuilder));
        const fixture = outerBuilder.create({c: { d: 'd1', e: 'e1' } });
        fixture.c.should.eql({ d: 'd1', e: 'e1' });
      });
  });
});