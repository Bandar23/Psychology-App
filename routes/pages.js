var express = require('express');
const { render } = require('express/lib/response');
var router = express.Router();
const {check,validationResult} = require('express-validator');
const Validation = require('../validation/auth');
const ScientistsValidation = require('../validation/scintists-validation');
const SubjectValidation = require('../validation/subject-Validation');
const UserValidauion = require('../validation/user-Validation');


const Book = require('../models/book');
const Scientists = require('../models/scientists');
const Creator =  require('../models/creators');
const Subject = require('../models/Subject');

const ControllerBook = require('../controller/book_controller');
const ControllerCreator = require('../controller/creators_controller');
const ControllerSubject  = require("../controller/SubjectsController");
const ControllerScientists = require("../controller/ScientstsController");
const passport = require('passport');
let multer = require('multer');

let storage = multer.diskStorage({

    destination:function(req,res,cb){
      cb(null,'./public/images');
    },
    filename:function(req,file,cb){
       cb(null,Date.now()+file.originalname);
    }
});

let fileFilter = function(req,file,cb){
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
  {
    cb(null, true);
  }
  else
  {
    cb(null, false);
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'+file));
  }
};

let upload = multer({
  storage:storage,
  fileFilter:fileFilter
});

let uploadImageSingle = upload.single('pic');


/* GET users listing. */
router.get('/', function(req, res, next) {
 
  res.render('index',{error:masseagError});
});

router.get('/turbulence',ControllerSubject.getUsersSubjects);
router.get('/subject-detales/:info',ControllerSubject.getDetaliesSubject);
router.get('/Scientists',ControllerScientists.getUsersScientists);
router.get('/scientists-detales/:info',ControllerScientists.getDetaliesScientist);
router.get('/ScientistLike/:id',ControllerScientists.addNewLike);//
router.get('/book',ControllerBook.getBooks);
router.get('/book-detales/:info',ControllerBook.getUsersBook);
router.get('/history',((req,res,next)=>{

  res.render('page/history', {title:'History'}); 

}));

router.get('/about',((req,res,next)=>{
res.render('page/about',{title:'من نكون'})
}));

router.get('/treatment-journey',((req,res,next)=>{
  
  res.render('page/treatment-journey',{title:'رحلة العلاج و التعافي'});
}));


router.get('/creators-login',isNotSingin,((req,res,next)=>{
  let masseagError = req.flash('error-login');
  res.render('creator/login',{title:'Login', toLogin:true,massage: masseagError});


}));

router.post('/creators-login',[
  check('email').not().isEmpty().withMessage('Pleass Enter Your Email'),
  check('email').isEmail().withMessage('Pleass Enter Valid Email ! '),
  check('password').not().isEmpty().withMessage('Enter Your Paasword'),

],(req,res,next)=>{
   
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    //console.log(errors.errors);

    let validationMassage = [];

    for(let i=0; i<errors.errors.length; i++){
      validationMassage.push(errors.errors[i].msg);
    }


    req.flash('error-login',validationMassage);
    res.redirect('creators-login');
    return;
  }


next();

},passport.authenticate('local-login',{
    successRedirect:'creators-main',
    failureRedirect:'creators-login',
    failureFlash: true
}));


router.get('/creators-main',isSingin,((req,res,next)=>{

  Creator.findById({_id:req.user.id},(error,result)=>{
 
    if(error){ 
      console.log(error);
    }else{
    console.log(req.session)
    console.log('This:'+req.user);
  res.render('creator/main',{title:'main', toLogin:true,items:result});
    }
  });

}));

router.get('/creators-profile',isSingin,((req,res,next)=>{
  let masseagError = req.flash('error-edit');

  Creator.findById({_id:req.user.id},(error,result)=>{
 
    if(error){ 
      console.log(error);
    }else{
      console.log(req.session)
      console.log(req.user.id);
    res.render('creator/profile',{title:'profile', toLogin:true,items:result,massage:masseagError});
   }

 });
   
}));

// creators-scientists
router.get('/creators-scientists',isSingin,ControllerScientists.getCreatorsScientists); 
router.get('/det-scientists/:info',isSingin,ControllerScientists.getCreatorsDetaliesScientist);
router.get('/edit-scientist/:info',isSingin,ControllerScientists.getUpdateScientist);
router.get('/new-scientist',isSingin,((req,res,next)=>{
  let masseagError = req.flash('error-add');
  const publisher = req.user.c_name;
   res.render('creator/new-scientist',{title:'إضافة شخصية جديدة',toLogin:true,creator:publisher,Error:masseagError})
})); 
router.post('/scientist-Update',isSingin,ControllerScientists.UpdateScientist);
router.post('/addScientist',isSingin,upload.single('pic'),ScientistsValidation.Validation,ControllerScientists.addScientist,
(error,req,res,next)=>{
  if(error){
    req.flash('error-add',error.message);
    res.redirect('new-scientist');
    return;
  }
});

router.post('/ApproveScientist',isSingin,ControllerScientists.Approve);
router.post('/DeleteScientist',isSingin,ControllerScientists.Delete);



 
router.get('/creators-subjects',isSingin,ControllerSubject.getCreatorsSubjects); 
 router.get('/creators-book',isSingin,ControllerBook.getBook); 


 router.get('/creators-New-book',isSingin,((req,res,next)=>{

  let masseagError = req.flash('error-add');
  const publisher = req.user.c_name;
  
  res.render('creator/new-book',{title:'new-book', toLogin:true,massage:masseagError,creator:publisher});
 })); 
 
 
router.post('/newbook',upload.single('pic'),Validation.AddValidauion,ControllerBook.addBook,
(error,req,res,next)=>{
  if(error){
    req.flash('error-add',error.message);
    res.redirect('creators-new-book');
    return;
  }
}); 

router.get('/creators-new-subject',isSingin,((req,res,next)=>{

  let masseagError = req.flash('error-add');
  const publisher = req.user.c_name;
  
  res.render('creator/new-subject',{title:'مقال جديد', toLogin:true,massage:masseagError,creator:publisher});


 })); 

router.post('/infoEdit',isSingin,((req,res,next)=>{

  const ID = req.user.id;
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  
  const userUpdate = {
    c_name: name,
    c_email: email,
    c_username: username
  }
  Creator.updateOne({_id:ID},{$set:userUpdate},(error,doc)=>{
    if(error){
      console.log(error);
      req.flash('error-edit','something Wrong try later ! ');
      res.redirect('creators-profile');
      return;
    }else{
      console.log(doc);
      req.flash('error-edit','Udated !');
      res.redirect('creators-profile');
    }
  });

}))


router.get('/creators-addUser',isSingin,((req,res,next)=>{
  let masseagError = req.flash('error-add');
  res.render('creator/add-user',{toLogin:true,massage:masseagError});

}));

router.post('/newUser',UserValidauion.UserValidauion,ControllerCreator.addUser)

router.get('/creators-logout',isSingin,(req,res,next)=>{
  req.logOut();
  res.redirect('creators-login');
});

router.get('/creators-publishers',isSingin,ControllerCreator.getusers);
router.get('/det-book/:info',ControllerBook.getCreatorsBook);
router.get('/edit-book/:id',ControllerBook.getUpdateBook);
router.post('/editbook',isSingin,ControllerBook.updateBook);
router.post('/ApproveBook',isSingin,ControllerBook.Approve);
router.post('/DeleteBook/',isSingin,ControllerBook.Delete);
//router.post('/creatorsBdelete/',isSingin,ControllerBook.CreatorsDelete);



router.get('/det-subject/:info',ControllerSubject.getCreatorsDetailsSubject);
router.get('/edit-subject/:info',ControllerSubject.getEditSubject);
router.post('/newSubject',isSingin,upload.single('pic'),SubjectValidation.SubjecAdd,ControllerSubject.addSubject,
(error,req,res,next)=>{
  if(error){
    req.flash('error-add',error.message);
    res.redirect('creators-new-subject');
    return;
  }

}); 
router.post('/updateSubject',isSingin,ControllerSubject.updateSubject);
router.post('/Approvesubject',isSingin,ControllerSubject.Approve);
router.post('/Deletesubject',isSingin,ControllerSubject.Delete);
router.get('/SubjectLike/:id',ControllerSubject.addLike);


router.get('/join',(req,res,next)=>{

  res.render('page/join',{title:'الانضمام'});

});

//router.post('/sendEmail',ControllerEmail.sendToEmail);


// functio to approve 

function BookApprove(id){
    console.log(id);
}

function isSingin(req,res,next){
  if(!req.isAuthenticated()){
  
    res.redirect('creators-login');
    return;
   }
  next();
  }
  
  
  function isNotSingin(req,res,next){
    if(req.isAuthenticated()){
      res.redirect('/');
      return;
     }
    next();
    }

    /// function for likes

    function sendLike(){
      alert(1);
    }



router

module.exports = router;
