const Subject = require("../models/Subject");
const {check,validationResult} = require('express-validator');
const { session } = require('passport');
const { redirect } = require("express/lib/response");
const { reports } = require("./book_controller");



getUsersSubjects = function(req,res,next){
    Subject.find({status:true},(error,reuslt)=>{

        if(error){ 
          console.log(error);
        }else{
          
          res.render('page/turbulence', {title:'الدراسات و المواضيع',items:reuslt});
        }

    })
} 
   
getDetaliesSubject = function(req,res,next){
  Subject.find({_id:req.params.info},(error,doc)=>{
    if(error){ 
      console.log(error);
    }else{
      res.render('page/subject-details', {title:'تفاصيل ',items:doc});
    }
  });
}

getEditSubject = function(req,res,next){
  const publisher = req.user.c_name;
  Subject.find({_id:req.params.info},(error,doc)=>{
    if(error){ 
      console.log(error);
    }else{
      res.render('creator/edit-subject', {title:'تعديل الموضوع',items:doc,toLogin:true,id:req.params.info,creator:publisher});
    }
  });
}

getCreatorsSubjects = function(req,res,next){
  const publisher = req.user.c_name;

  if(req.user.c_type){
    Subject.find({},(error,doc)=>{
      if(error){ 
        console.log(error);
      }else{
        res.render('creator/subjects',{title:'subjects', toLogin:true,items:doc,creator:publisher});
      }
    });
  }else{
     Subject.find({publisher:req.user.c_name},(error,doc)=>{
      if(error){ 
        console.log(error);
      }else{
        res.render('creator/subjects',{title:'subjects', toLogin:true,items:doc,creator:publisher});
      }
     });
  }
}

getCreatorsDetailsSubject = function(req,res,next){
  const publisher = req.user.c_name;
  const creator_type = req.user.c_type;


    Subject.find({_id:req.params.info},(error,doc)=>{
      if(error){ 
        console.log(error);
      }else{
        res.render('creator/det-subject', {title:'معلومات المقالة',items:doc,toLogin:true,creator:publisher,Admin:creator_type});
      }

 });
}

addSubject = function(req,res,next){
 
  if(!req.file){
    req.flash('error-add','الرجاء إدخال صورة مناسبة للمقالة');
    res.redirect('creators-new-subject');
    return;
  }else{

    let Time = new Date();
    let TDate = Time.toLocaleDateString();
    const newSubject = new Subject({
    title:req.body.title,
    pic:req.file.filename,
    content:req.body.content,
    Date:TDate,
    publisher:req.body.publisher,
    status:false,
    likes:0,
  });

  newSubject.save((error,doc)=>{
    if(error){
      req.flash('error-add','something Wrong, Try later !');
      console.log(error);
      res.redirect('creators-new-subject');
      return;
    }else{
      
      req.flash('error-add','تم الإضافة');
      res.redirect('creators-new-subject')
       return;
    }
});
  }

}

updateSubject = function(req,res,next){
   const id = req.body.id;
   const updateSub = {
     title:req.body.title,
     content:req.body.content,
   }

     Subject.updateOne({_id:id},{$set:updateSub},(error,doc)=>{
       if(error){
         console.log(error);
         return;
       }else{
        res.redirect('creators-subjects');
       }
     });


}

Approve = function(req,res,next){
  const id = req.body.id;
  const Update = {
   status:true
 }

 Subject.updateOne({_id:id},{$set:Update},(error,doc)=>{
  if(error){
   console.log(error);
   return;
  }else{
   console.log(doc);
   res.redirect('creators-subjects');
 }

});

}

Delete = function(req,res,next){
  const id = req.body.id;
 

 Subject.deleteOne({_id:id},(error,doc)=>{
  if(error){
   console.log(error);
   return;
  }else{
   console.log(doc);
   res.redirect('creators-subjects');
 }

});
}

addLike = function(req,res,next){
Subject.findById({_id:req.params.id},(error,doc)=>{
if(error){
  console.log(error);
  return;
}else{
  let likes = doc.likes;
  let id    = doc._id;
  const UpdateLikes = {
    likes: likes +1,
  }

  Subject.updateOne({_id:id}, {$set:UpdateLikes}, (error,doc)=>{
     if(error){
       console.log(error);
       return;
     }else{
       res.redirect('../subject-detales/'+id);
     }
  }); 

}
});
}

Sreports = function(req,res,next){
  res.render('creator/sublect-reports',{title:'تقارير المقالات',toLogin:true})
}


module.exports = {
    addSubject:addSubject,
    getUsersSubjects:getUsersSubjects,
    getDetaliesSubject:getDetaliesSubject,
    getCreatorsSubjects:getCreatorsSubjects,
    getCreatorsDetailsSubject:getCreatorsDetailsSubject,
    getEditSubject:getEditSubject,
    updateSubject:updateSubject,
    Approve:Approve,
    Delete:Delete,
    addLike:addLike,
    Sreports:Sreports,
}