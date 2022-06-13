const {check,validationResult} = require('express-validator');
const Creators = require('../models/creators');
const nodeMailer = require('nodemailer');
const { response } = require('../app');





sendToEmail = function(req,res,next){
    let masseagError = req.flash('error-wrong');
   

   Creators.findOne({c_email:req.body.to},(err,doc)=>{
  
    if(!doc){
        req.flash('error-wrong','الايميل ليس متوفر');
        res.render('index',{error:masseagError}); 
      
        return;
    }else{
       let transport = nodeMailer.createTransport({
           service: "Gmail",
           auth:{
               user:"bandar5mubarky@gmail.com",
               pass:"Bandar112233"
           }
       });

       let mailOption = {
           from:"bbbaa613@gmail.com",
           to: req.body.to,
           Subject:"Password Rest",
           text:'Hi BB'
       };
       transport.sendMail(mailOption,(error,info)=>{

        if(error){
            return console.log(error);
        }else{
            return console.log(info);
        }
       });
    }

     

   });

}


module.exports = { sendToEmail:sendToEmail};