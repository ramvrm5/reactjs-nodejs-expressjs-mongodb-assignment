var express = require('express');
var router = express.Router();
var carHandler = require("../handler/carHandler.js");

/*Get carList */
router.get('/carInventoryList', function(req, res, next) {
    carHandler.carInventoryList(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });

/*Save carDetails */
router.post('/addCarDetails', function(req, res, next) {
    carHandler.addCarDetails(req.body, (error, obj) => {
        if (error) {
          res.json(error);
        } else {
          res.json(obj);
        }
      });
  });
  module.exports = router;