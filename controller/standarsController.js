const Standard = require('../models/standars');
const { check, validationResult } = require('express-validator');
const { session } = require('passport');


newTest = function(req,res,next){

  
    let name       = req.body.title;
    let publisher  = req.body.publisher;
    let des        = req.body.header;
    let title      = req.body.title;
    let body       = req.body;
    
    delete body.publisher;
    delete body.name;
    delete body.header;
    delete body.title;

    console.log(body);





    
}


module.exports = {
    newTest:newTest,
}
