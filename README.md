autofixturejs
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
```
Factory.define('User',['first_name','last_name','email'])
```
This will create an object with the fields specified in the array

```
var user = Factory.create('User')

```
The user object will have the fields specified in the definition with puedo random values:
```
{
    first_name: 'first_name1',
    last_name: 'last_name1',
    email: 'email1'
}
```
When you create another instance of this object with the factory, the numbers will be incremented:
```
    //second object:
    var user2 = factory.create('User')
    
    {
        first_name: 'first_name2',
        last_name: 'last_name2',
        email: 'email2'
    }
```
To change the behavior of the factory and return specific data types, several helper methods are added to the string object

```
Factory.define('User',[
    'first_name',
    'id'.asNumber(),
    'created'.asDate(),
    
    ]);
    
//created will be DateTime.now
var user = Factory.create('user')
{
    first_name: 'first_name1',
    id: 1
    created: Date
}
```




