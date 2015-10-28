function simpleAjax(method, url) {

  var executor = function(resolve, reject) {
    var xhr  = new XMLHttpRequest();
    xhr.onerror = function() {
      reject(this.statusText);
    };
    xhr.onload = function() {
      if (this.status >= 200 && this.status <= 300) {
        resolve(this.response);
      } else {
        reject(this.statusText);
      }
    };
    xhr.open(method, url);
    xhr.send();
  };

  return new Promise(executor);
}

//We can make a get function using bind to fix the first param of simpleAjax.
var ajaxGet = simpleAjax.bind(null, 'GET');

document.addEventListener('DOMContentLoaded', function(){

  //Make a name
  ajaxGet('/word/n')
  .then(function(serverResponse){
    // serverResponse because that's how we resolved the promise above    
    return arg + ' H. ' ;
  }).then(function(arg){
    // the arg here is the return value of the prior function in the then 
    // chain. This time round we'll return a promise of a value
    return simpleAjax('get', '/word/y').then(function(response){ return arg + response; });
  }).then(function(arg){
    document.getElementById('output1').innerHTML = 'Hello ' + arg;
  });

  // This time we'll use Promise.all for added ease
  var p1 = ajaxGet('/word/n');
  var p2 = ajaxGet('/word/n');
  Promise.all([p1, p2]).then(function(values){
    document.getElementById('output2').innerHTML = 'Goodbye ' + values[0] + 'G. ' + values[1];
  })

});
