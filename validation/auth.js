
const {check,validationResult} = require('express-validator');



exports.AddValidauion = 
    [
        check('Bname').not().isEmpty().escape().withMessage('رجاءا ادخل اسم الكتاب'),
        check('Bname').not().isAlpha('a-zA-Z'['ar']).withMessage('رجاءا كتابة اسم الكتاب باللغة العربية '),
        check('Bname').custom((value,{req})=>{
          let reg  = /[\W][A-Za-z-0-9]/g;
          if(value.match(reg)){
            throw new Error('الرجاء ادخال الاسم الكتاب بشكل صحيح');
          }
          return true;
        }),
        check('Rname').not().isEmpty().withMessage('رجاءا ادخل اسم المؤلف'),
        check('Rname').not().isAlpha('a-zA-Z'['ar']).withMessage('رجاءا كتابة اسم المؤلف باللغة العربية '),
        check('Rname').custom((value,{req})=>{
          let reg  = /[\W][A-Za-z-0-9]/g;
          if(value.match(reg)){
            throw new Error('الرجاء ادخال الاسم المؤلف بشكل صحيح');
          }
            return true;
      
          
        }),
      
        check('pages').not().isEmpty().withMessage('رجاءا ادخل عدد الصفحات'),
        check('date').not().isEmpty().withMessage('رجاءا ادخل تاريح النشر'),
        check('brife').not().isEmpty().withMessage('رجاءا ادخل النبذة'),
        check('brife').not().isAlpha('a-zA-Z'['ar']).withMessage('رجاءا كتابة النبذة باللغة العربية '),
        (req, res, next) => {

          const Errors = validationResult(req);
          if(!Errors.isEmpty()){
          //  console.log(Errors);
          let validationMassage = [];
        
            for(let i=0; i<Errors.errors.length; i++){
              validationMassage.push(Errors.errors[i].msg);
            }
        
        
            req.flash('error-add',validationMassage);
            res.redirect('creators-new-book')
            return;
        }
          next();
        }
      
];

