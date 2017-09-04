var request = require('request');

var options = {
	url: 'http://www.cepaberto.com/api/v2/ceps.json?cep=21235280',
	headers: {'Authorization': 'Token token=195c1952a125d1424bb59a9daea74809'}
};


function callback(error, response, body) {
if (!error && response.statusCode == 200) {
var info = JSON.parse(body);
console.log(info);
}
}
request(options, callback);
