const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String},
    avatar: {type: String},
    nickName: {type: String},
    categories: [{type: mongoose.SchemaTypes.ObjectID, ref: 'Category'}],
    scores: {
        difficult: {type: Number},          //难度
        skill: {type: Number},              //技能
        burst: {type: Number},              //爆发
        survive: {type: Number},            //生存
        push: {type: Number},               //推线
    },
    skills: [{
        name: {type: String},
        icon: {type: String},
        description: {type: String},
        tips: {type: String},
    }],
    openingEquipments: [{type: mongoose.SchemaTypes.ObjectID, ref: 'Equipment'}],           //出门装
    coreEquipments: [{type: mongoose.SchemaTypes.ObjectID, ref: 'Equipment'}],              //核心装备
    finalEquipments: [{type: mongoose.SchemaTypes.ObjectID, ref: 'Equipment'}],              //后期神装
    useTips: {type: String},
    battleTips: {type: String},
    partners: [{type: mongoose.SchemaTypes.ObjectID, ref: 'Hero'}],
    counters: [{type: mongoose.SchemaTypes.ObjectID, ref: 'Hero'}],
})

module.exports = mongoose.model('Hero', schema)