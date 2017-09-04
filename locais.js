var request = require("request");
var readline = require('linebyline');
var rl = readline('./queryVotosCepRosa.csv');
var fs = require('graceful-fs');

function isEmpty(val){
        return (val === undefined || val == null || val.length <= 0) ? true : false;
}

var status = function(valor){
        if(valor >= 1000){
            return "muitoAlta"
        }

        if(valor < 1000 && valor >= 500){
            return "alta"
        }

        if(valor < 500 && valor >= 100){
            return "moderada"
        }

        if(valor < 100 && valor >= 25){
            return "baixa"
        }

        if(valor < 25){
            return "muitoBaixa"
        }
}

        
    rl.on('line', function(line, lineCount, byteCount) {   

        var array = line.split(','); 

        var options = {
            url: 'http://www.cepaberto.com/api/v2/ceps.json?cep=' + array[0],
            headers: {'Authorization': 'Token token=195c1952a125d1424bb59a9daea74809'}
        };


        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            
            var str = info.latitude + ',' + info.longitude + ',' + status(array[1]);

                fs.writeFile('./rosaCep.csv',str + '\n',{enconding:'utf-8',flag: 'a'}, function (err) {
                if (err) throw err;
                });

            }
        }
        

        request(options, callback);

        
    rl.on('end', function(){

      
    })

  })
  .on('error', function(e) {
    console.log('Erro do tipo: ' + e);
  });        
   