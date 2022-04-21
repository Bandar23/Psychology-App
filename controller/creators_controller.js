const Creators = require('../models/creators');
const { check, validationResult } = require('express-validator');
const { session } = require('passport');


addUser = function (req, res, next) {
    const newUser = new Creators({
        c_name: req.body.Pname,
        c_email: req.body.Pemail,
        c_password: new Creators().hashPasswprd(req.body.Pass),
        c_username: req.body.Pusername,
        c_type: false,
        author: true
    });

    newUser.save((error, result) => {

        if (error) {
            req.flash('error-add', 'something Wrong, Try later !');
            res.redirect('creators-addUser');
            return;
        } else {

            req.flash('error-add', 'تم الإضافة');
            res.redirect('creators-addUser')
            return;
        }
    });
}
getusers = function(req,res,next){
    Creators.find({},(error,result)=>{
 
        if(error){ 
          console.log(error);
        }else{
          
         res.render('creator/publishers', {title:'Show-Publishers', items:result,toLogin:true,status:true}); 
       }
    });
}
module.exports = {
    addUser:addUser,
    getusers:getusers
}