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

        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + array[0] + "&key=AIzaSyA2Q17pKrmTvyPvTomLtIw6pgEVfxlHYjI"

        request(url, {json: true}, function (error, response, body) {
            var str = null;          

          
            if (!error && response.statusCode === 200)
            {

                if(!isEmpty(body.results)){
                    str = body.results[0].geometry.location.lat + ',' + body.results[0].geometry.location.lng + ','  + status(array[1]);                 
                }else{
                    str = 0.0 + ',' + 0.0 + ','  + status(array[1]);
                }        
            }

            
            fs.writeFile('./rosaCep.csv', str + '\n',{enconding:'utf-8',flag: 'a'}, function (err) {
            if (err) throw err;
            });

        });


    rl.on('end', function(){

      
    })

  })
  .on('error', function(e) {
    console.log('Erro do tipo: ' + e);
  });        
   