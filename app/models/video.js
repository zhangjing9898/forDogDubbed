'use strict'

var mongoose=require('mongoose')
var Schema=mongoose.Schema;
var ObjectId=Schema.ObjectId;
var Mixed=Schema.Types.Mixed;  //Schema.Types.Mixed是Mongoose定义个混合类型

var VideoSchema=new Schema({
    author:{
        type:ObjectId,
        ref:'User'
    },

    qiniu_key:String,
    persistenId:String,
    qiniu_final_key:String,
    qiniu_detail:Mixed,

    public_id:String,
    detail:Mixed,

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

VideoSchema.pre('save',function (next) {
    if(this.isNew){
        this.meta.createAt=this.meta.updataAt=Date.now()
    }else{
        this.meta.updataAt=Date.now()
    }
    next()
})

module.exports=mongoose.model('Video',VideoSchema);