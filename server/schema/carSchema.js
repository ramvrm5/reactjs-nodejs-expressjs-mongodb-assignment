var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var carSchema = new Schema({
    carName: {type:String,required:true,unique:true},
    carType:String,
    priceType:String,
    basePrice:String,
});

var car = mongoose.model('car',carSchema, 'car');
module.exports = car;