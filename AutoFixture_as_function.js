String.prototype.asNumber = function(){
	var fieldName = this;
	return function(incrementer) 
	{
		return{
			name : fieldName,
			value : incrementer	
		};
		
	};
}
String.prototype.asDate = function(){
	var fieldName = this;
	return function(incrementer){
		return{
			name:fieldName,
			value: new Date()
		}
	}
}
String.prototype.withValue = function(customValue){
	var fieldName = this;
	return function(incrementer){
		return{
			name:fieldName,
			value: customValue+incrementer
		}
	}

}

String.prototype.fromFixture = function(fixtureName){
	var fieldName = this;
	return function(incrementer,factory){
		console.log(this.toString());
		return{
			name:fieldName,
			value: exports.create(fixtureName)
		}
	}
}

var fixtures = {}
var buildFromArray = function buildFromArray(fieldArr, incrementer){
	var fixture = {};
	var that = this;
	fieldArr.forEach(function(n){
		if(typeof n === 'string'){
			fixture[n] = n+incrementer;	
		}
		else if (typeof n == 'function'){
			
			funcResult = n(incrementer,that );
			
			fixture[funcResult.name] = funcResult.value
		}
		
	});
	return fixture;
}
var buildFromObject = function buildFromObject(fieldObj, incrementer){
	
	var fixture = {};
	for(var k in fieldObj){
	
		if(fieldObj.hasOwnProperty(k)){
			var fieldValue = fieldObj[k];
			if(typeof fieldValue === 'string')

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
}
var createFixture = function(fixtureName, overrides, incrementer){
	var fixtureDef = fixtures[fixtureName].definition;
	var fixtureCount = fixtures[fixtureName].count;
	var fixture;
	var incrementValue = fixtureCount + incrementer;
	console.log("increment value: " + incrementValue)
	if(fixtureDef instanceof Array){
		fixture = buildFromArray(fixtureDef, incrementValue)
	}
		
	else if(fixtureDef instanceof Object){
		
		fixture = buildFromObject(fixtureDef, incrementValue)
	}
	if(overrides){
		for(o in overrides){
			if(overrides.hasOwnProperty(o) && fixture.hasOwnProperty(o)){
				fixture[o] = overrides[o];
			}
		}
	}
	fixtures[fixtureName].count = incrementValue;
	return fixture;

}

exports.define = function define(name, fixtureDef){
	
	
	fixtures[name] ={};
	fixtures[name].definition = fixtureDef;
	fixtures[name].count = 0;
};

exports.create = function create(fixtureName,overrides){
	return createFixture(fixtureName, overrides,1);
}

exports.createListOf =function createListOf(fixtureName, count, overrides){
	overrides = overrides || {}
	var result = []
	for(var i=0; i < count; i++){
		result[i] =  createFixture(fixtureName, overrides,i+1);
	}
	return result;
}