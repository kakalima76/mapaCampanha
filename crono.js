var request = require("request");
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

var puxaDados = function(){
		return new Promise(function(fulfill, reject){
			request('http://localhost:3010/ceps', {json: true}, function (error, response, body) {
	            var str = null;          
	                
	            if (!error && response.statusCode === 200)
	            {
	            	fulfill(body);
	            }        
	    	})
	    })
	}
	

	var promise = puxaDados();
	promise.then(function(data){
		var count = 0;
		var intervalo = setInterval(function(){
			
				var options = {
            	url: 'http://www.cepaberto.com/api/v2/ceps.json?cep=' + data[count].cep,
            	headers: {'Authorization': 'Token token=195c1952a125d1424bb59a9daea74809'}
        		};


        request(options, function (error, response, body) {
            		if (!error && response.statusCode == 200) {
           			var info = JSON.parse(body);
           			console.log(info);
            
            		if(info.latitude){
            		var str = info.latitude + ',' + info.longitude + ',' + status(data[count].votos);
            		count++;
            		}else{
            		var str = data[count].cep + ',' + data[count].votos;	
            		count++;
            		}

	                fs.writeFile('./rosaCep.csv',str + '\n',{enconding:'utf-8',flag: 'a'}, function (err) {
	                if (err) throw err;
	                });
            	}

            	if(count > data.length - 1){
					clearInterval(intervalo);
				}
        	});

		},3000);
	});



