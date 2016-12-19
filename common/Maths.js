   
module.exports = {
  findElementPositionInArray: function (element,array) {
    return array.indexOf(element); 
  },
  
  shuffleArray: function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  },
  
  checkArgumentsLength: function (expected, received) {
      if (expected!=received){
          throw "NumberOfArgumentsException";
      }
      
  },
    createSeed:function(s) {
        return function() {
//            console.log("random seed")
            s = Math.sin(s) * 10000; return s - Math.floor(s);
        };
    }
};
