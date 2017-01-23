module.exports = function(define){

  define('sum', function(){
    return this.reduce(function(m, v){
      m += v;
      return m;
    }, 0);
  });

};
