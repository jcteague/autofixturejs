var should = require("should");
var Factory = require('../AutoFixture');
var fixtures = require('./fixtures');
describe('getting fixtures from file',function(){
	it("should be able to create the fixture from the fixtures files",function(){
		
		var fixture = Factory.create('UserFixture');
		should.exist(fixture);
		fixture.should.have.property('first_name');
		fixture.should.have.property('last_name');

	});

});