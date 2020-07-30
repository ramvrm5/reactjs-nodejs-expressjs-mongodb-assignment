var mongoose = require('mongoose');
var carSchema = require('../schema/carSchema.js');
var pdfcrowd = require("pdfcrowd");

// create the API client instance
var client = new pdfcrowd.HtmlToPdfClient("ramverma5", "48fddbf188ee1c8594efa01e5d4d771d");
var output;

exports.carInventoryList = function carInventoryList(myObj, callback) {
    carSchema.find({}, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { response_code: 200, error: false, result: result };
        }
        return callback(null, output);
    });
}

exports.addCarDetails = function addCarDetails(myObj, callback) {
    var _carSchema = new carSchema(myObj);
    _carSchema.save(function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
        }
        else {
            output = { message: "Record Added", response_code: 200, error: false };
        }
        return callback(null, output);
    });
}


exports.updateCarDetails = function updateCarDetails(myObj, callback) {
    console.log(myObj);
    carSchema.findOneAndUpdate({ _id: myObj.id }, myObj, { upsert: true }, function (err, result) {
        if (err) {
            output = { response_code: err.code, error: true, message: err.message };
            return callback(null, output);
        }
        else {
            // run the conversion and write the result to a file
            client.convertStringToFile(
                "<html><body><h1>" + myObj.carName + "(" + myObj.carType + ")" + myObj.availableAfter + "days" + myObj.totalPrice + "</h1></body></html>",
                "public/pdf_files/"+myObj.carName + ".pdf",
                function (err, fileName) {
                    if (err) return console.error("Pdfcrowd Error: " + err);
                    console.log("Success: the file was created " + fileName);
                    output = { message: "Record Updated", response_code: 200, error: false, data: fileName };
                    return callback(null, output);
                });
        }
    });
}