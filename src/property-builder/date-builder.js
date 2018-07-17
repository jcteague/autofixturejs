const build = function({incrementDay= false} = {}) {
  return (increment) => {
    console.log(this);
    console.log('build function');
    const propValue = new Date();
    if(incrementDay){
      propValue.setDate(propValue.getDate()+increment-1);
    }
    return {
      propName: this,
      propValue
    }
  }
};
Object.defineProperty(String.prototype, 'asDate', {
  value: build,
});
module.exports = build;