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
    router.post('/u/signup',App.hasBody, User.signup);
    router.post('/u/verify',App.hasBody, User.verify);
    router.post('/u/update',App.hasBody,App.hasToken,User.update);

    //app
    router.post('signature',App.hasBody,App.hasToken,App.signature);

    //creations
    router.get('')

    return router;
}