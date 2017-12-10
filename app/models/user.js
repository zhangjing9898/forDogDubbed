'use strict'

var mongoose=require('mongoose');

var UserSchema=new mongoose.Schema({
    phoneNumber:{
        unique:true,
        type:String
    },
    areaCode:String,
    verifyCode:String,
    verified:{
        type:Boolean,
        default:false
    },
    accessToken:String,
    nickname:String,
    gender:String,
    age:String,
    avatar:String,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updataAt:{
            type:Date,
            default:Date.now()
        }
    }
})

UserSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.updataAt=Date.now()
    }else{
        this.meta.updataAt=Date.now();
    }
    next();
})

module.exports=mongoose.model('User',UserSchema);