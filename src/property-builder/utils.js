module.exports = {
  attachBuilderToString: (name, value) =>{
    Object.defineProperty(String.prototype, name, {
      value
    })
  }
};