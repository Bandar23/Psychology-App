const Exam = require('../models/exams');
const { check, validationResult } = require('express-validator');
const { session } = require('passport');




addTest = function(req,res,next){

    const newExam = new Exam({
        Qus:req.body. Qus,
        answers:req.body.publisher
    });

    newExam.save((error,doc)=>{
         if(error){
            console.log(error);
            req.flash('error-Exams','هناك مشكلة الرجاء المحاولة لاحقا');
            res.redirect('addTest');
            return;
         }else{
           req.flash('Done-Exams','Done ');
           res.redirect('addTest');
           return;
         }
    });
}

getUserTests = function(req,res,next){
    Exam.find({},(error,result)=>{
        if(error){
            console.log(error);
            return;
         }else{
            res.render('page/Standards',{title:'standards',items:result});
           return;
         }
    });
}

getUserStandar =  function(req,res,next){
    Exam.find({title:req.params.title},(error,doc)=>{
        if(error){
            console.log(error);
            return;
         }else{
            res.render('page/standard',{title:'اختبار',items:doc});
            console.log(doc);

           return;
         }
    });
}



module.exports = {
    addTest:addTest,
    getUserTests:getUserTests,
    getUserStandar:getUserStandar,
}