var firstNames = require('./first-names');
var lastNames = require('./last-names');

var getRandomElement = function (array){
  var max = array.length;
  var i = Math.floor(Math.random()*max);
  return array[i];

}

module.exports.firstNameGenerator = function(){
  let fieldName = this;
  return function firstNameBuilder(incrementer){
    return {
      name: fieldName,
      value: getRandomElement(firstNames)
    }
  }
}
module.exports.lastNameGenerator = function(){
  let fieldName = this;
  return function firstNameBuilder(incrementer){
    return {
      name: fieldName,
      value: getRandomElement(lastNames)
    }
  }
}
module.exports.fullNameGenerator = function(){
  let fieldName = this;

  return function firstNameBuilder(incrementer){
    var first = getRandomElement(firstNames);
    var last = getRandomElement(lastNames);
    var name = first + ' ' + last;
    return {
      name: fieldName,
      value: name
    }
  }
}
