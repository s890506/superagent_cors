# 透過請求轉發解決跨域問題

前端在串接他方 API 時，面對 Cross-Origin Resource Sharing (CORS，跨域)的問題應該算是頗頻繁的，受瀏覽器的同源策略限制，JavaSript 只能請求本域內的資源。簡單說就是你想在本地想使用 ajax 串接跨域 API 時，就會跳出下列錯誤訊息：

> Can not load *--url--* access not allowed by Access-control-allow-origin.

> Origin *--url--* is not allowed by Access-Control-Allow-Origin.

筆者在此提供一個解決辦法，透過 Node 的 Express + superAgent 架設 Web Server 並請求轉發 (後端沒有跨域問題)，再讓前端頁面來串接此 API。

Node.JS 範例代碼如下 (header、auth、data 均為選擇性使用)：
```
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
```

最後我們即可透過串接剛寫好的 API 即可。

參考資料：https://github.com/visionmedia/superagent