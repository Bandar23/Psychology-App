const {check,validationResult} = require('express-validator');



exports.UserValidauion = 
    [
        check('Pname').not().isEmpty().escape().withMessage('رجاءا ادخل اسم المحرر'),
        check('Pname').custom((value,{req})=>{
            let reg  = /[\W][A-Za-z-0-9]/g;
            if(value.match(reg)){
              throw new Error('الرجاء ادخال الاسم المحرر بشكل صحيح');
            }
            return true;
          }),

        check('Pemail').not().isEmpty().withMessage('يجب ادخال الايميل'),
        check('Pemail').isEmail().withMessage('يجب ادخال ايميل صالح'),

        check('Pass').not().isEmpty().withMessage('يجب ادخال كلمة المرور'),
        check('Pass').isLength({min:5}).withMessage('يجب أن تكون كلمة المرور أكثر من 5 أحرف'),
        check('Pconfirme').custom((value, {req})=> {
          if(value !== req.body.Pass){
            throw new Error('كلمة المرور غير متطابقة ');
          }
          return true;
        }),

        check('Pusername').not().isEmpty().escape().withMessage('رجاءا ادخل اسم المستخدم'),
        check('Pusername').custom((value,{req})=>{
          let reg  = /[\W][A-Za-z-0-9]/g;
          if(value.match(reg)){
            throw new Error('الرجاء ادخال اسم المستخدم بشكل صحيح');
          }
            return true;          
        }),(req, res, next) => {

            const Errors = validationResult(req);
            if(!Errors.isEmpty()){
            console.log(Errors);
            let validationMassage = [];
          
              for(let i=0; i<Errors.errors.length; i++){
                validationMassage.push(Errors.errors[i].msg);
              }
          
          
              req.flash('error-add',validationMassage);
              res.redirect('creators-addUser')
              return;
          }
            next();
          }
    ]