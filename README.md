autofixturejs [![Build Status](https://travis-ci.org/jcteague/autofixturejs.svg?branch=master)](https://travis-ci.org/jcteague/autofixturejs) [![Coverage Status](https://coveralls.io/repos/github/jcteague/autofixturejs/badge.svg?branch=master)](https://coveralls.io/github/jcteague/autofixturejs?branch=master)
=============

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

##Overriding values 
You can override fields at creation time as well
```js
factory.define('User',[
    'first_name',
    'roles'.asArray(1)
]);

var adminUser = factory.create('User',{roles:['admin']});
```

To change the behavior of the factory and return specific data types, several helper methods are added to the string object

```js
Factory.define('User',[
    'first_name',
    'id'.asNumber(),
    'created'.asDate(),
    'roles'.asArray(2),
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
Generally speaking you'll want to put the fixture definitions into a single file and reuse for different tests.  There's no real specific way you must do this, but this is how I've set mine up and it is working well for me

Create a module that takes the factory as a function dependency
```js
//fixtures.js
=============

exports.module = function(factory){
    factory.define ...
}
```
In your test files require AutoFixture then pass the AutoFixture variable to the fixtures class
```js
//tests.js
var factory = require('AutoFixture')
require('./fixtures')(factory)
```
Now you can use the factory to access your defined fixtures.
```js
describe("my tests",functio(){
    var user = factory.create('user');
    
});
```

