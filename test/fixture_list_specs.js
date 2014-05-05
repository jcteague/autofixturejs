require('should');
var Factory = require('../AutoFixture');

describe("When creating a List of Fixtures",function(){

	it("should create an array of fixtures of the number specified",function(){
		Factory.define("user",['first_name','last_name']);

		var fixtures = Factory.createListOf('user',5);
		fixtures.length.should.eql(5);
	});

	it("should change the values of each fixture created",function(){
		Factory.define("user",['first_name','last_name']);

		var fixtures = Factory.createListOf('user',2);

		console.log(fixtures);
		fixture_1_name = fixtures[0].first_name
		fixture_2_name = fixtures[1].first_name
		fixture_1_name.should.not.equal(fixture_2_name);
	});
});