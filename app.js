var express = require('express');  
var request = require('superagent');  
var app = express();

app.get('/',function(req, res){

    var sreq = request.post('<api url>')
                         .set('<header>','<value>')
                         .auth('<username>', '<password>')
                         .send(<your json data>);

    sreq.pipe(res);
    sreq.on('end', function(){
        console.log('Done.');
    });
});

app.listen(3000,function(){  
    console.log('HTTP 伺服器在 http://127.0.0.1:3000/ 上運行');
});