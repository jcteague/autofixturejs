autofixturejs [![Build Status](https://travis-ci.org/jcteague/autofixturejs.svg?branch=master)](https://travis-ci.org/jcteague/autofixturejs) [![Coverage Status](https://coveralls.io/repos/github/jcteague/autofixturejs/badge.svg?branch=master)](https://coveralls.io/github/jcteague/autofixturejs?branch=master)
=============

[![Join the chat at https://gitter.im/autofixturejs/Lobby](https://badges.gitter.im/autofixturejs/Lobby.svg)](https://gitter.im/autofixturejs/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

AutoFixture is a test fixture library that allows users to define fixtures for testing and populates them with pseudo random data.

This library is inspired by Factory-Girl (and the similar node variations) and NBuilder.

## Usages

Using the library consists of two parts, 1) defining the factories and 2) creating them in your tests

## Creating a factory

You can define an object factory in one of the ways

- Array of strings
- object notation

### Fields Defined with an Array
```js
Factory.define('User',['first_name','last_name','email'])
```
This will create an object with the fields specified in the array

```js
var user = Factory.create('User')

```
The user object will have the fields specified in the definition with pseudo random values:
```js
{
    first_name: 'first_name1',
    last_name: 'last_name1',
    email: 'email1'
}
```
When you create another instance of this object with the factory, the numbers will be incremented:
```js
    //second object:
    var user2 = factory.create('User')
    
    {
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2'
    }
```
You can also create an array of fixtures, each with with unique values.
```js
var users = factory.createListOf('User',2)

[
    {
        first_name: 'first_name1',
        last_name: 'last_name1',
        email: 'email1'
    },
    {
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2'
    }
```
##Name Generators
You can generate random names without the generic `first_name1` values
```js
var user = factory.create('User',[
  'firstName'.asFirstName(),
  'lastName'.asLastName(),
  'fullName'.asFullName()
]);
```
Will generate names randomly selected from a list.  `asFullName()` will concatenate a first name and last name.

It currently selects from a list of 25 first and last names.  If this is not enough let me know and I will increase the pool size

## Overriding values
You can override the values at creation time, allowing you to create a generic fixture and change just the values you need for a specific test.
```js
factory.define('User',[
    'first_name',
    'roles'.asArray(1)
]);

var adminUser = factory.create('User',{roles:['admin']});
```
Alternatively you can pass a function as the override which will give you more control over the result of the override.  This is especially helpful for deeply nested objects.
```js
var user = Factory.create('user', (user)=> {
			user.first_name = 'James';
			user.last_name = 'Kirk';
			user.orders[0] = 'new order';
			return user;
		})
```
You can append new fields through overrides as well.  This is useful to create a fixture that could either be passed to an orm like Mongoose or bookshelf without and id.  But if you want to simulated an already persisted fixture, you can an `id` attribute.

```js
factory.define('User', ['first_name', 'last_name']);

// un-persisted fixture:
var user = factory.create('User'); // result: { first_name: 'first_name1', last_name: 'last_name1' }

// persisted user with an id field
var user = factory.create('User', { id: 1 }); // result: { first_name: 'first_name1', last_name: 'last_name1', id: 1 }

To change the behavior of the factory and return specific data types, several helper methods are added to the string object

```js
Factory.define('User',[
    'first_name',
    'id'.asNumber(),
    'created'.asDate(),
    'roles'.asArray(2),
    'department'.asConstant('Sales'),
    'city'.withValue('MyCity'),
    'has_car'.asBoolean()
    'email'.asEmail(),
    'color'.pickFrom(['green', 'yellow', 'red'])
    ]);
    
//created will be DateTime.now
var user = Factory.create('user')
{
    first_name: 'first_name1',
    id: 1
    created: Date
    roles: ['roles1','roles2'],
    city: 'MyCity1'
}
```
`asConstant` will create the same value for all fixtures

Custom generators can be defined as well:
```js
Factory.define('User',[
'first_name',
'email'.as(function(i){ return 'email'+i+'@email.com';});
]);

var user = factory.create('User');

{
    first_name: 'first_name1',
    email: 'email1@email.com'
}
```
You can also use other Factories to generate fields
```js

Factory.define('User',[
    'first_name',
    
]);

Factory.define('Order',[
    'id'.asNumber(),
    'order_date'.asDate()
    'user'.fromFixture('User')
]);
```
Or a list of fixtures
```js
//generates orders property as an array with five Order objects
Factory.define('user',[
  'name'.asFullName(),
  'orders'.asListOfFixtures('Order',5)
]);
##Using Objects to Define a Factory

You can also use an object to define your fixtures.  When you use an object the values for each field are used to create random data when you create the fixture
```js
factory.define('User',{first_name, 'first', created_at: new Date(), id:1});
var user = factory.create('User');
{
    first_name: 'first1';
    created_at: new Date
    id: 1
}
```
## Creating a Fixtures file
Generally speaking you'll want to put the fixture definitions into a single file and reuse for different tests.

There are several ways to do this, but what has worked best for me is to create a fixtures file, define the fixtures and export the factory.

Create a module that takes the factory as a function dependency
```js
//fixtures.js
=============
var factory = require('autofixture');

factory.define ...

exports.module = factory;
```
In your test files just require your fixture and use the exported factor
```js
//tests.js
var factory = require('./fixtures')

```
Now you can use the factory to access your defined fixtures.
```js
describe("my tests",functio(){
    var user = factory.create('user');
    
});
```
Change Log:
 -- 1.0
    -- Fixed issue with overriding array properties.
    -- Can now append new properties with overrides.


