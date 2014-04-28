require('should');
var Factory = require('../AutoFixture');

describe("When creating a List of Fixtures",function(){

	it("should create an array of fixtures of the number specified",function(){
		Factory.define("user",['first_name','last_name']);

		var fixtures = Factory.createListOf('user',5);
		fixtures.length.should.eql(5);
	});

	it("should increment the counter for each fixture created",function(){
		Factory.define("user",['first_name','last_name']);

		var fixtures = Factory.createListOf('user',2);

		console.log(fixtures);
		fixtures[0].first_name.should.equal("first_name1");
		fixtures[1].first_name.should.equal("first_name2");
	});
});