/**
 * Created by jcteague on 10/29/17.
 */
String.prototype.as = function(builder){
  var fieldName = this;
  return function(incrementer){
    return{
      name: fieldName,
      value: builder(incrementer)
    };
  };
};
String.prototype.asNumber = function(){
  var fieldName = this;
  return function(incrementer)
  {
    return{
      name : fieldName,
      value : incrementer
    };
  };
};

String.prototype.asDate = function(){
  var fieldName = this;
  return function(incrementer){
    return{
      name:fieldName,
      value: new Date()
    };
  };
};

String.prototype.asEmail = function(){
  var fieldName = this;
  return function(incrementer){
    return{
      name:fieldName,
      value: "email"+incrementer+"@example.com"
    };
  };
};

String.prototype.pickFrom = function(options){
  options = options || [];
  var fieldName = this;
  return function(incrementer){
    return{
      name:fieldName,
      value: options.length?options[Math.floor(Math.random()*options.length)]:null
    };
  };
};

String.prototype.asBoolean = function(){
  var fieldName = this;
  return function(incrementer){
    return{
      name:fieldName,
      value: Math.floor(Math.random()*2)?true:false
    };
  };
};

String.prototype.asArray = function(length){
  var fieldName = this;
  var createArray = function(incrementer){
    result = [];
    for(var i = incrementer; i<incrementer+length; i++){
      result.push(fieldName+i);
    }
    return result;
  };
  return function(incrementer){
    return{
      name: fieldName,
      value: createArray(incrementer)
    };
  };
};

String.prototype.withValue = function(customValue){
  var fieldName = this;
  return function(incrementer){
    return{
      name:fieldName,
      value: customValue+incrementer
    };
  };

};

String.prototype.asConstant = function(fieldValue){
  var fieldName = this;
  return function(incrementer)
  {
    return{
      name : fieldName,
      value : fieldValue
    };
  };
};


