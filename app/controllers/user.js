'use strict'

var xss=require('xss');
var mongoose=require('mongoose');
var User=mongoose.model('User');
var uuid=require('uuid');
var sms=require('../services/sms');

exports.signup=function *(next) {
    var phoneNumber=xss(this.request.body.phoneNumber.trim());

    var user=yield  User.findOne({
        phoneNumber:phoneNumber
    }).exec()
    //exec()正则匹配

    var verifyCode=sms.getCode();

    if(!user){
        var accessToken=uuid.v4();

        user=new User({
            nickname:'小狗包',
            phoneNumber:xss(phoneNumber),
            verifyCode:verifyCode,
            accessToken:accessToken
        })
    }else{
        user.verifyCode=verifyCode
    }

    try{
        user=yield user.save()
    }catch(e){
        this.body={
            success:false
        }
        return next;
    }

    var msg='您的注册验证码是:'+user.verifyCode;

    try{
        sms.send(user.phoneNumber,msg)
    }catch(e){
        console.log(e);
        this.body={
            success:false,
            err:'短信服务异常'
        }
        return next;
    }
    this.body={
        success:true
    }
}

