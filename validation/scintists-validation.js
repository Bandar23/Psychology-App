const {check,validationResult} = require('express-validator');

exports.Validation =
[

    check("name").not().isEmpty().escape().withMessage("رجاء ادخل أسم العالم"),
    check("name").not().isAlpha('a-zA-Z'['ar']).withMessage('رجاء أدخل اسم العالم باللغة العربية'),
    check("name").custom((value,req)=>{
        let reg  = /[\W][A-Za-z-0-9]/g;
        if(value.match(reg)){
          throw new Error('الرجاء ادخال الاسم بشكل صحيح');
        }
        return true;
    }),
    check("content").not().isEmpty().withMessage("رجاء ادخل نبذة عن العالم "),
    check("content").not().isAlpha('a-zA-Z'['ar']).withMessage('رجاء أدخل النبذة باللغة العربية'),
    (req,res,next)=>{
        const Errors = validationResult(req);
        if(!Errors.isEmpty()){
        //  console.log(Errors);
        let validationMassage = [];
      
          for(let i=0; i<Errors.errors.length; i++){
            validationMassage.push(Errors.errors[i].msg);
          }
      
      
          req.flash('error-add',validationMassage);
          res.redirect('new-scientist')
          return;
      }
        next();
      }

]