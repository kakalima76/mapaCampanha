var request = require('request');
var readline = require('linebyline');
var fs = require('graceful-fs');
rl = readline('./rosa.csv');

   var status = function(valor){
    	if(valor >= 100){
    		return "muitoAlta"
    	}

    	if(valor < 100 && valor >= 75){
    		return "alta"
    	}

    	if(valor < 75 && valor >= 50){
    		return "moderada"
    	}

    	if(valor < 50 && valor >= 25){
    		return "baixa"
    	}

    	if(valor < 25){
    		return "muitoBaixa"
    	}
    }


	var carrega = function(){
		var array = []
        return new Promise(function(fulfill, reject){
            rl.on('line', function(line, lineCount, byteCount) {
    		var res = []; 
    		res = line.split(',');
    		
    		if(res.length === 1){
    			fulfill(array);
    			console.log('ok');
    		}

    		array.push(res);
  			})

  			.on('error', function(e) {
    		// something went wrong 
  			});     
        })
    }//fim da function

    var promise = carrega();
    promise.then(function(data){
    	data.forEach(function(value){
    		value[0] = parseInt(value[0]);
    		value[1] = parseInt(value[1]);
    		value[2] = parseInt(value[2]);
    	})

    	data.forEach(function(value){
	    	var obj = {}

			obj['zona'] = value[0],
			obj['secao'] = value[1],
			obj['status'] = status(value[2])

			var response = obj['zona'] + ',' + obj['secao'] + ',' + obj['status'] + '\n';

	    	 	fs.writeFile('./rosaCep.csv', response ,{enconding:'utf-8',flag: 'a'}, function (err) {
		    	if (err) throw err;
				});
			
			request.post({url:'http://localhost:3010/locais/buscar', json: true, form: obj}, function(err,httpResponse,body){
	    	 	obj['cep'] = body[0].CEP
	    	 	
			}) 
    	})
    })

     
    

   


  
 

   