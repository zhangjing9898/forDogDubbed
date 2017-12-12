'use strict'

//lodash使用全局的_来提供对工具的快速访问,一致的跨浏览器行为
var _=require('lodash');
var mongoose=require('mongoose');
var Promise=require('bluebird');
var Video=mongoose.model('Video');
var Audio=mongoose.model('Audio');
var Creation=mongoose.model('Creation');
var xss=require('xss');
var robot=require('../services/robot');
var config=require('../../config/config');

exports.up=function *(next) {
    var body=this.request.body;
    var user=this.session.user;
    var creation=yield Creation.findOne({
        _id:body._id
    }).exec()

    if(!creation){
        this.body={
            success:false,
            err:'视频找不到了!'
        }
        return next
    }

    if(body.up==='yes'){
        creation.votes.push(String(user._id))
    }else{
        creation.votes=_.without(creation.votes,String(user._id))
    }

    creation.up=creation.votes.length;

    yield creation.save();

    this.body={
        success:true
    }
}

var userFields=[
    'avatar',
    'nickname',
    'gender',
    'age',
    'breed'
]

exports.find=function *(next) {
    var page=parseInt(this.query.page,10)||1;
    var count=5;
    var offset=(page-1)*count
}
