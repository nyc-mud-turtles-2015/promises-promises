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

//We can make a get method using bind.
var ajaxGet = simpleAjax.bind(null, 'GET');

document.addEventListener('DOMContentLoaded', function(){
  ajaxGet('/word/n')
  .then(function(arg){
    return arg + ' H. ' ;
  }).then(function(arg){
    return simpleAjax('get', '/word/y').then(function(response){ return arg + response; });
  }).then(function(arg){
    document.getElementById('output').innerHTML = 'Hello ' + arg;
  });
});