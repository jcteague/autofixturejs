module.exports.find = function(array, value){
  var index = array.findIndex(value);
  if (index === -1){
    return null;
  }
  return array[index];

}