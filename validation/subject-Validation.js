const {check,validationResult} = require('express-validator');


exports.SubjecAdd = 
[
    check("title").not().isEmpty().escape().withMessage("رجاء أدخل العنوان"),
    check("title").not().isAlpha('a-zA-Z'['ar']).withMessage('رجاء أدخل اسم العالم باللغة العربية'),
    check("title").custom((value,req)=>{
        let reg  = /[\W][A-Za-z-0-9]/g;
        if(value.match(reg)){
          throw new Error('الرجاء ادخال العنوان بشكل صحيح');
        }
        return true;
    }),
    check("content").not().isEmpty().withMessage("الرجاء ادخال المحتوى"),
    check("content").not().isAlpha('a-zA-Z'['ar']).withMessage("الرجاء ادخل المحتوى باللغة العربية  "),
    (req,res,next)=>{
        const Errors = validationResult(req);
        if(!Errors.isEmpty()){
            let validationMassage = [];

            for(let i=0; i<Errors.errors.length; i++){
                validationMassage.push(Errors.errors[i].msg);
            }

            req.flash('error-add',validationMassage);
            res.redirect('creators-new-subject');
            return;
        }
          next();
        }
        

];