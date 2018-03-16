require('./src/builder-functions');
var names = require('./names');

String.prototype.asFirstName = names.firstNameGenerator;
String.prototype.asLastName = names.lastNameGenerator;
String.prototype.asFullName = names.fullNameGenerator;

String.prototype.fromFixture = function(fixtureName){
  var fieldName = this;
  return function(incrementer){

    return{
      name:fieldName,
      value: create(fixtureName)
    };
  };
};


String.prototype.asListOfFixtures = function(fixtureName, length){
  const fieldName = this;
  return function(incrementer){
    const fixtures = [];
    for(let i = 0; i < length; i++){
      fixtures.push(exports.create(fixtureName))
    }
    return{
      name:fieldName,
      value: fixtures
    };
  };
};


	var fixtures = {};

    var buildFromArray = function buildFromArray(fieldArr, incrementer){
		var fixture = {};
		var that = this;
		fieldArr.forEach(function(n){
			if(typeof n === 'string'){
				fixture[n] = n+incrementer;	
			}
			else if (typeof n == 'function'){
				
				funcResult = n(incrementer,that );
				
				fixture[funcResult.name] = funcResult.value;
			}
			
		});
		return fixture;
	};
	var buildFromObject = function buildFromObject(fieldObj, incrementer){
	
		var fixture = {};
		for(var k in fieldObj){
		
			if(fieldObj.hasOwnProperty(k)){
				var fieldValue = fieldObj[k];
				if(typeof fieldValue === 'function'){
                    fixture[k] = fieldValue(incrementer);
                }
                else if(typeof fieldValue === 'string')

					if(fieldValue !== null && fieldValue !== '' ){
						fixture[k] = fieldValue+incrementer;
					}
					else{
						fixture[k] = k+incrementer;	
					}
					
					
				else{
					fixture[k] = fieldObj[k];
				}
			}
		}
	
		return fixture;
	};
	var createFixture = function(fixtureName, overrides, incrementer){
		var fixtureDef = fixtures[fixtureName].definition;
		var fixtureCount = fixtures[fixtureName].count;
		var fixture;
		var incrementValue = fixtureCount + incrementer;
		
		if(fixtureDef instanceof Array){
			fixture = buildFromArray(fixtureDef, incrementValue);
		}
			
		else if(fixtureDef instanceof Object){
			
			fixture = buildFromObject(fixtureDef, incrementValue);
		}

		var applyOverrides = function(target, override){
			for(var o in override){

				if(typeof o === 'object'){

					applyOverrides(target,o);
				}
				if(override.hasOwnProperty(o) && target.hasOwnProperty(o)){
					if(typeof target[o] === 'object')
                        			applyOverrides(target[o],override[o]);
                        		else
                    				target[o] = override[o];
				}
			}
		};
		if(overrides){
			applyOverrides(fixture, overrides)	;
		}

		fixtures[fixtureName].count = incrementValue;
		return fixture;

	};


const create = (fixtureName,overrides) => {
  return createFixture(fixtureName, overrides,1);
};

const createListOf = (fixtureName, count, overrides) =>{
  overrides = overrides || {};
  var result = [];

  for(var i=0; i < count; i++){
    var fixture =  createFixture(fixtureName, overrides,i+1);
    result[i] =  fixture;

  }
  return result;
};
const define = (name, fixtureDef) => {
  fixtures[name] ={};
  fixtures[name].definition = fixtureDef;
  fixtures[name].count = 0;
  return {
    create(overrides) {
    	return createFixture(name,overrides, 1)},
    createListOf(count, overrides) { return createListOf(name, count, overrides)},
	};
};


exports = module.exports =  {
	define,
  createListOf,
	create,
};
