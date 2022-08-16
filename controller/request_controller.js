const Request = require('../models/requests');
const {check,validationResult} = require('express-validator');
const { session } = require('passport');



addRequest = function(req,res,next){
    
    const NewReq = new Request({
       title:   req.body.title,
       content: req.body.content,
       date: new Date(),
       sender: req.body.sender,
    });

    NewReq.save((error,result)=>{
        if(error){
           // console.log(error);
            req.flash('error-req','هناك مشكلة،حاول مرة اخرى');
            res.redirect('creators-main');
            return;
        }else{
           // console.log(result);
            req.flash('error-req','تم الارسال');
            res.redirect('creators-main');
            return;
        }
    });
} 


module.exports = {
    addRequest : addRequest,
}