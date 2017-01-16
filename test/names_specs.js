var should = require("should");
var find = require('lodash.find')
var firstNameList = require('../names/first-names');
var lastNameList = require('../names/last-names');
var Factory = require("../AutoFixture");

describe("Name Fixtures", function(){

  it("should use a name from first name list", function(){
    Factory.define("NamedUser",[
      'firstName'.asFirstName()
    ]);
    var createdUser = Factory.create("NamedUser");
    var expectedName = find(firstNameList,function(i){ return i === createdUser.firstName});
    should.exist(expectedName);
  });
  it('should create unique names for different created fixtures', function(){
    Factory.define("NamedUser",[
      'firstName'.asFirstName()
    ]);
    var user1 = Factory.create("NamedUser");
    var user2 = Factory.create("NamedUser");
    user1.firstName.should.not.equal(user2.firstName)
  })

  it("should use a name from last name list", function(){
    Factory.define("NamedUser",[
      'firstName'.asFirstName(),
      'lastName'.asLastName()
    ]);
    var createdUser = Factory.create("NamedUser");
    var expectedName = find(lastNameList,function(i){ return i === createdUser.lastName});
    should.exist(expectedName);
  });

  it("should create a full name", function(){
    Factory.define("NamedUser",[
      'firstName'.asFirstName(),
      'lastName'.asLastName(),
      'name'.asFullName()
    ]);
    createdUser = Factory.create("NamedUser");
    var names = createdUser.name.split(' ');
    var expectedFirstName = find(firstNameList,function(i){ return i === names[0]});
    var expectedLastName = find(lastNameList,function(i){ return i === names[1]});
    should.exist(expectedFirstName);
    should.exist(expectedLastName);
  });
})