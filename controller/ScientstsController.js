const Scientists = require("../models/scientists");
const { check, validationResult } = require('express-validator');
const { session } = require('passport');



// get all scientists for users not creators
getUsersScientists = function (req, res, next) {
  Scientists.find({status:true}, (error, result) => {

    if (error) {
      console.log(error);
    } else {
      res.render('page/scientists', { title: 'العلماء', items: result });
    }
  });
}

// for users not creators
getDetaliesScientist = function (req, res, next) {
  Scientists.find({ _id: req.params.info }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.render('page/scientists-details', { title: 'تفاصيل ', items: doc });
    }
  });
}

// all Scientists for creators not users

addScientist = function (req, res, next) {
  const newScientist = new Scientists({
    name: req.body.name,
    pic: req.body.pic,
    content: req.body.content,
    publisher: req.body.c_name,
    status: false
  });

  newScientist.save((error, result) => {

    if (error) {
      req.flash('error-add', 'something Wrong, Try later !');
      res.redirect('new-scientist');
      return;
    } else {
      req.flash('error-add', 'تم الإضافة');
      res.redirect('new-scientist')
      return;
    }
  });

  console.log('This: ' + req.user._id);


}

getCreatorsScientists = function (req, res, next) {
  const publisher = req.user.c_name;

  if (req.user.c_type) {
    Scientists.find({}, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.render('creator/scientists', { title: 'العلماء', items: result, toLogin: true,creator:publisher});
      }
    });
  } else {
    Scientists.find({ publisher: req.user.c_name }, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.render('creator/scientists', { title: 'العلماء', items: result, toLogin: true,creator:publisher });
      }
    });
  }
}

// Detalies for creators not users 
getCreatorsDetaliesScientist = function (req, res, next) {
  const publisher = req.user.c_name;
  const creator_type = req.user.c_type;


  Scientists.find({ _id: req.params.info }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.render('creator/det-scientist', { title: 'معلومات العالم', items: doc, toLogin: true,creator:publisher,Admin:creator_type });
    }

  });
}

// Update Scientist By Creators 

getUpdateScientist = function (req, res, next) {
  let masseagError = req.flash('error-edit');
  const publisher = req.user.c_name;
  Scientists.find({ _id: req.params.info }, (error, doc) => {
    if (error) {
      console.log(error);
    } else {
      res.render('creator/edit-scientists', { title: 'تعديل ', items: doc, toLogin: true, id: req.params.info,creator:publisher,masseagError:masseagError});
    }
  });
}

UpdateScientist = function (req, res, next) {
  const id = req.body.id;
  const UpdateScientist = {
    name: req.body.name,
    content: req.body.content,
  }

  Scientists.updateOne({ _id: id }, { $set: UpdateScientist }, (error, doc) => {
    if (error) {
      console.log(error);
      return;
    } else {
      res.redirect('creators-scientists');
    }
  });

}

Approve = function(req,res,next){
  const id = req.body.id;
  const Update = {
   status:true
 }

 Scientists.updateOne({_id:id},{$set:Update},(error,doc)=>{
  if(error){
   console.log(error);
   return;
  }else{
   console.log(doc);
   res.redirect('creators-scientists');
 }

});

}

Delete = function(req,res,next){
  const id = req.body.id;
 

 Scientists.deleteOne({_id:id},(error,doc)=>{
  if(error){
   console.log(error);
   return;
  }else{
   console.log(doc);
   res.redirect('creators-scientists');
 }

});

}
module.exports = {
  addScientist: addScientist,
  getUsersScientists: getUsersScientists,
  getDetaliesScientist: getDetaliesScientist,
  getCreatorsScientists: getCreatorsScientists,
  getCreatorsDetaliesScientist: getCreatorsDetaliesScientist,
  getUpdateScientist: getUpdateScientist,
  UpdateScientist: UpdateScientist,
  Approve:Approve,
  Delete:Delete,
}