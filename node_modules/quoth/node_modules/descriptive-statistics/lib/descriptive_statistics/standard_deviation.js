module.exports = function(define){

  define('standard_deviation', function(){
    return Math.sqrt(this.variance);
  });

};
