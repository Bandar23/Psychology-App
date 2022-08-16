const {check,validationResult} = require('express-validator');


exports.ReqAdd = 
[
    check("title").not().isEmpty().escape().withMessage("رجاء أدخل العنوان"),
    check("title").not().isAlpha('a-zA-Z'['ar']).withMessage('رجاء أدخل اسم العنوان بالعربية'),
    check("title").custom((value,req)=>{
        let reg  = /[\W][A-Za-z-0-9]/g;
        if(value.match(reg)){
          throw new Error('الرجاء ادخال العنوان بشكل صحيح');
        }
        return true;
    }),
    check("content").not().isEmpty().escape().withMessage("الرجاء ادخال المحتوى"),
    check("content").not().escape().isAlpha('a-zA-Z'['ar']).withMessage("الرجاء ادخل المحتوى بالعربية  "),
    (req,res,next)=>{
        const Errors = validationResult(req);
        if(!Errors.isEmpty()){
            let validationMassage = [];

            for(let i=0; i<Errors.errors.length; i++){
                validationMassage.push(Errors.errors[i].msg);
            }

            req.flash('error-req',validationMassage);
            res.redirect('creators-main');
            return;
        }
          next();
        }
        

];