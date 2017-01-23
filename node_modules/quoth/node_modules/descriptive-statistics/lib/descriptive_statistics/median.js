module.exports = function(define){

  define('median', function(){
    return this.percentile(50);
  });

};
