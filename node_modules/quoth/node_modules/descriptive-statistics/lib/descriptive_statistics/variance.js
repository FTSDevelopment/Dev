module.exports = function(define){

  define('variance', function(){
    var mean = this.mean;
    return this
      .map(function(sample){ return Math.pow(mean - sample, 2); })
      .reduce(function sum(m, v){ m += v; return m; }, 0) / this.number;
  });

};
