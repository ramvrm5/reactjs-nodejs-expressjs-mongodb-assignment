var mongoose = require('mongoose');
var carSchema = require('../schema/carSchema.js');
var output;

exports.carInventoryList = function carInventoryList(myObj, callback){
    carSchema.find({} ,function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = {response_code: 200, error: false , result:result};
        }
        return callback(null, output);
    });
}

exports.addCarDetails = function addCarDetails(myObj, callback){
    var _carSchema = new carSchema(myObj);
    _carSchema.save(function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message};
        }
        else {
            output = { message: "Record Added", response_code: 200, error: false};
        }
        return callback(null, output);  
    });
}