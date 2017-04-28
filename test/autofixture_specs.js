require("should");
var Factory = require("../AutoFixture");

describe("Creating Single Fixture",function(){
	it("should create the object with the fields and generic data for each property",function(){
		Factory.define("User",["first_name", "last_name", "email"]);	
		var user = Factory.create("User");
		user.should.have.property("first_name","first_name1");	
		user.should.have.property("last_name","last_name1");	
		user.should.have.property("email","email1");	
	});

	it("should be able to create a fixture from object properties",function(){
		var user = {
			name: "name",
			email: "email",
			created: "created"
		};
		Factory.define("User", user);
		createdUser = Factory.create("User");
		createdUser.should.have.property("name","name1");
		createdUser.should.have.property("email","email1");
		createdUser.should.have.property("created","created1");
	});

	it("should be able to define a field as a number",function(){
		Factory.define('User',[
			"name",
			"id".asNumber()
		]);

		var u = Factory.create("User");
		u.id.should.equal(1);
	});
	it('should be able to use a constant as property value',function() {
		Factory.define('user',[
			'firstName'.asConstant('Barack'),
			'lastName'.asConstant('Obama')
		])
		var user1 = Factory.create('user');
		user1.firstName.should.equal('Barack');
		user1.lastName.should.equal('Obama');

		var user2 = Factory.create('user');
		user2.firstName.should.equal('Barack');
		user2.lastName.should.equal('Obama');
	})

	it("should be able to infer the type from the object values",function(){
		Factory.define('User',{firstName: 'nameValue',id:2});
		var created = Factory.create('User');
		created.should.have.property("firstName","nameValue1");
		created.should.have.property("id",2);
	});

	it("should be able to create dates from an Array of fields when specified",function(){
		Factory.define('user', [
			"name",
			"created_at".asDate()
			] );
		var fixture = Factory.create("user");
		fixture.should.have.property("name","name1");
		fixture.should.have.property("created_at");
		fixture.created_at.should.be.instanceOf(Date);
	});

	it("should be able to create a date field when defined with an object",function(){
		Factory.define('User',{firstName: 'firstName',created_at:new Date()});
		var fixture = Factory.create('User');
		fixture.should.have.property("created_at");
		fixture.created_at.should.be.instanceOf(Date);
	});

	it("should be able to override the value prefix when using an array to initialize",function(){
		Factory.define('user', [
			"name".withValue("custom")
			
			] );
		var fixture = Factory.create("user");
		fixture.should.have.property("name","custom1");
	});

	it("should be able to overwrite a value when creating",function(){
		Factory.define('user', [
			"name"
			] );
		var fixture = Factory.create("user",{name:'my name'});
		fixture.should.have.property("name","my name");
		console.log(fixture);
	});
	it('should be able to use a function to override the fixture', function () {
		Factory.define('user',[
			'first_name',
			'last_name',
			'orders'.asArray(2)
		]);
		var user = Factory.create('user', (user)=> {
			user.first_name = 'James';
			user.last_name = 'Kirk';
			user.orders[0] = 'new order';
			return user;
		})
		user.first_name.should.equal('James')
		user.last_name.should.equal('Kirk')
		user.orders[0].should.equal('new order')
  })
  it('should create a property as an Array of the provided length',function(){
    Factory.define('user',[
      'roles'.asArray(5)
    ]);
    var user = Factory.create('user');
    user.should.have.property('roles');
    user.roles.should.be.instanceOf(Array);
    user.roles.should.have.lengthOf(5);
  });

  it('should be able to overide an array property', function () {
  	Factory.define('user',[
  		'roles'.asArray(5)
		]);
  	let user =  Factory.create('user', {roles: [1,2,3]})
		user.roles.should.have.lengthOf(3)
		user.roles.should.eql([1, 2, 3]);
	})
  it('should be able to append new fields that are on the override', function () {
    Factory.define ('user',['first_name', 'last_name']);
    let user = Factory.create('user', {id: 1});
    user.should.eql({ first_name: 'first_name1', last_name: 'last_name1', id: 1 })
  })

	it("should have different values when two or more are created in the same factory instance",function(){
		Factory.define('user', ["name",] );
		var fixture1 = Factory.create('user');
		var fixture2 = Factory.create('user');
		console.log("fixture1 name="+fixture1.name);
		console.log("fixture2 name="+fixture2.name);
		fixture1.name.should.not.eql(fixture2.name);
	});

	it("should be able to create a property that is a fixture",function(){
		Factory.define ('user',['first_name']);
		Factory.define('order',[
			'order_number',
			'user'.fromFixture('user')
		]);
		var order = Factory.create('order');
		order.should.have.property('user');
		order.user.should.have.property('first_name');
	});

	it("nested-fixture: should be able to override properties a fixture that is part of another fixture",function(){
		Factory.define ('user',['first_name','last_name']);
		Factory.define('order',[
			'order_number',
			'user'.fromFixture('user')
		]);
		var order = Factory.create('order',{user:{first_name:'changed value'}});
        console.log(order);
		order.user.first_name.should.eql('changed value');
		order.user.should.have.property('last_name','last_name1');
	});

    it("should be able to apply a custom generator function",function(){
        Factory.define('user',['first_name','email'.as(function(i){return "email"+i+"@email.com";})]);
        var user_1 = Factory.create('user');
        var user_2 = Factory.create('user');
        user_1.first_name.should.eql('first_name1');
        user_1.email.should.eql('email1@email.com');
        user_2.email.should.eql('email2@email.com');
    });

    it("should be able to apply custom generator through object notation",function(){
        Factory.define('user',{first_name:'name',email: function(i){return 'email'+i+"@email.com";}});
        var user = Factory.create('user');
        user.email.should.eql('email1@email.com');
    });

    it('should be able to create a valid email string', function(){
    	Factory.define('Email', [
    		'email'.asEmail()
    	]);

    	Factory.create('Email').email.should.equal('email1@email.com');
    	Factory.create('Email').email.should.equal('email2@email.com');
    });

    it('should be able to pick a random item from a provided array', function(){
    	var colors = ['red', 'green', 'yellow'];
    	var consoles = ['ps4', 'xbox', 'msx'];

    	Factory.define('Preferences', [
    		'color'.pickFrom(colors),
    		'console'.pickFrom(consoles)
    	]);

    	var random_preferences_1 = Factory.create('Preferences');

    	colors.indexOf(random_preferences_1.color).should.be.above(-1);
    	colors.indexOf(random_preferences_1.color).should.be.below(colors.length);

    	consoles.indexOf(random_preferences_1.console).should.be.above(-1);
    	consoles.indexOf(random_preferences_1.console).should.be.below(consoles.length);
    });

    it('should be able to return a random boolean (true or false)', function(){
    	Factory.define('Boolean', [
    		'field'.asBoolean()
    	]);

    	Factory.create('Boolean').field.should.be.a.Boolean
    	Factory.create('Boolean').field.should.be.a.Boolean
    });

    it('create field as an array of fixtures', function(){
      Factory.define('order',[
        'orderNumber'.asNumber(),
        'orderTotal'.asNumber(),
        'orderDate'.asDate()
      ]);
      Factory.define('customer',[
        'name'.asFullName(),
        'orders'.asListOfFixtures('order',5)
      ]);
      var customer = Factory.create('customer');
      customer.orders.should.have.lengthOf(5);
      customer.orders[0].should.have.property('orderNumber');
      customer.orders[0].should.have.property('orderTotal');
      customer.orders[0].should.have.property('orderDate');
    })
		it('should throw an error if fixture does not exist', function () {
			Factory.define('user',['name'])
			Factory.create.bind(null,'wrong fixture').should.throw(/wrong fixture/);

    })


});
