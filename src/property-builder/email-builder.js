const { attachBuilderToString } = require('./utils');

const buildEmail = function(){
  var propName = this;
  return function(incrementer){
    return{
      propName,
      propValue: "email"+incrementer+"@example.com"
    };
  };
};

attachBuilderToString('asEmail', buildEmail);