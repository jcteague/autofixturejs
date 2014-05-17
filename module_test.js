
var module = function module(){
	var innerFunction = function(){
		return "inner function";
	}
	return {
		 retFunc : function(){
		 		console.log("ret function");
		 }
	}
}

exports = module.exports = module;