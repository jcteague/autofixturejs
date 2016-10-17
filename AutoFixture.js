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
			value: "email"+incrementer+"@email.com"
		};
	};
};

String.prototype.fromArray = function(options){
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
        for(var i = incrementer; i<=incrementer+length; i++){
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

String.prototype.fromFixture = function(fixtureName){
	var fieldName = this;
	return function(incrementer){
		
		return{
			name:fieldName,
			value: exports.create(fixtureName)
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

exports = module.exports =  {
		define : function define(name, fixtureDef){
		fixtures[name] ={};
		fixtures[name].definition = fixtureDef;
		fixtures[name].count = 0;
		},

		create: function create(fixtureName,overrides){
			return createFixture(fixtureName, overrides,1);
		},

		createListOf: function createListOf(fixtureName, count, overrides){
			overrides = overrides || {};
			var result = [];

			for(var i=0; i < count; i++){
				var fixture =  createFixture(fixtureName, overrides,i+1);
                result[i] =  fixture;

			}
			return result;
		}		
	};
