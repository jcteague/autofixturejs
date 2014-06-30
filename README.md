mongoose-fixture-prep
=====================

This module has only one purpose: help manage test data setup when you're using mongoose and make the test data easy to access in your tests.

To do that, it only has two methods:
1. create
2. clean_up

## Tested With Mocha
I've only used it with Mocha, and the functions are setup to take a callback when they are finished like the before and after functions in mocha are used.  However I doubt this would not work for other testing frameworks as well.

## Creating test data
The create method can create and any model you've defined.  After it saves the model, it makes it available as a field on the FixturePrep object.  You provide the create method with an array of objects the has three properties:
	1) model: the name of the Mongoose model you want to create
	2) name: the name of the field you want to access it with from the fixturePrep object
	3) val: the data you want saved

You also provide a callback to call when all models have been created.

### Creating a single object
```
var FixturePrep = require("mongoose-fixture-prep");
var fixtures = new FixturePrep();

define("creating a test", function(){
		before(function(done){
			fixtures.create([{name:'user1',model: 'User', val:{firstName:'John',lastName:'Smith'}}], done)				
		})
		
		it("should be able to access the object you saved", function(){
			//user1 is attached to the
			(fixtures.user1 === null).should.not.be.true;
		}
})
```
### Creating multiple models
You pass into the create function an array of data to create so that you can create multiple objects.  the function handles all of the asynchrounous stuff so that your tests stay clean and readable

```
var FixturePrep = require("mongoose-fixture-prep");
var fixtures = new FixturePrep();

define("creating a test", function(){
		before(function(done){
			fixtures.create([{name:'user1',model: 'User', val:{firstName:'John',lastName:'Smith'}},
											 {name:'admin',model: 'User', val:{firstName:'super',lastName:'user', roles:['admin']}}
											], done)				
		})
		
		it("should be able to access the object you saved", function(){
			//user1 is attached to the
			(fixtures.user1 === null).should.not.be.true;
			(fixtures.admin === null).should.not.be.true;
		}
})
```
### Create an array of data
If your testing something that requires an array of data, you can pass in an array for the val parameter, and they will all be saved and all be accessible by the field name you provided

```
var FixturePrep = require("mongoose-fixture-prep");
var fixtures = new FixturePrep();

define("creating a test", function(){
		before(function(done){
			fixtures.create([{name:'users',model: 'User', val:[{firstName:'John',lastName:'Smith'},{firstName:'Jane',lastName:'Doe'}]},
											 {name:'admin',model: 'User', val:{firstName:'super',lastName:'user', roles:['admin']}}
											], done)				
		})
		
		it("should be able to access the object you saved", function(){
			//user1 is attached to the
			fixtures.users.length.should.eql(2);
			(fixtures.admin === null).should.not.be.true;
		}
})
```

### Creating Related Data
If your object model has related data, it's get's pretty tricky setting up all of the objects and getting their references right. The way this module handles that is to let you define a function that creates the val object to be saved.  The parameter to the function is the TestPrep object with references to objects that have already been created.

As an example of how you can define related data, this is how you could model an order with products, where an order has line items with products.

```
var FixturePrep = require("mongoose-fixture-prep");
var fixtures = new FixturePrep();

define("creating a test", function(){
		before(function(done){
			fixtures.create(
				[
					{name:'product_a',model: 'Product', val:{title:"Product A",description: "Product A Description"	},
					{name:"order1",model:'Order',val:function(fixtures){
						return new Order({line_items:[product:fixtures.product_a}])
					};
				], done)				
		})
		
		it("should have the saved product in the line items", function(){
			//user1 is attached to the			
			fixtures.order1.line_items[0].id.should.not.be.empty
		}
})
```
### Use with AutoTestjs
I've tested this module on real world applications in conjuction with [href="https://github.com/jcteague/autofixturejs"]

