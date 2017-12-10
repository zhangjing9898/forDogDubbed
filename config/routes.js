'use strict'

var Router=require('koa-router');
var User=require('../app/controllers/user');
var App=require('../app/controllers/app');

module.exports=function () {
    //添加url前缀
    var router=new Router({
        prefix:'/api'
    })

    //user
    router.post('/u/signup',User.signup);
    router.post('/u/verify',User.verify);

    return router;
}