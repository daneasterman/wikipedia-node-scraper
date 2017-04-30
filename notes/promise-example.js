require('promise');
var request = require('request');           
const requestget = function (url) {
  //Add the arrow on the below line
  return  new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(body);

         } else {
            reject(error);
         }
       });
  });
}
requestget('http://www.modulus.io').then(console.log);