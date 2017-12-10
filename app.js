'user strict'
//采用严格标准
var  fs=require('fs');
var path=require('path');
var mongoose=require('mongoose');
var db='mongodb://localhost/dogDubbed'

mongoose.Promise=require('bluebird');
mongoose.connect(db);

/*
* 14-43行的代码相当于require('app/models/xxx.js')
* */
var models_path=path.join(__dirname,'/app/models');

var walk=function (modelPath) {
    fs.readdirSync(modelPath)
        .forEach(function (file) {
            var filePath=path.join(modelPath,'/',file);
            // 同步版的 stat() 。
            //方法返回一个stat数组对象
            var stat=fs.statSync(filePath);

            if(stat.isFile()){
                if(/(.*)\.(js|coffee)/.test(file)){
                    require(filePath)
                }
            }else if(stat.isDirectory()){
                walk(filePath)
            }
        })
}

walk(models_path);

var koa=require("koa");
var logger=require("koa-logger");
var session=require('koa-session');
var bodyParser=require('koa-bodyparser');
var app=koa();

app.use(logger());
app.use(session(app));
app.use(bodyParser());

var router=require('./config/routes')();

app.use(router.routes())
    .use(router.allowedMethods())


app.listen(3000);
console.log('Listening:3000');