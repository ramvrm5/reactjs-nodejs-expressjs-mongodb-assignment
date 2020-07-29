var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var carSchema = new Schema({
    carName: {type:String,required:true},
    carType:String,
    priceType:String,
    basePrice:Number,
    rented:Number,
    availableAfter:Number,
});

var car = mongoose.model('car',carSchema, 'car');
module.exports = car;