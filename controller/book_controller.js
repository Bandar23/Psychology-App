
const Book = require('../models/book');
const {check,validationResult} = require('express-validator');
const { session } = require('passport');



getBooks = function(req,res,next){
  
  Book.find({status:true},(error,result)=>{
 
    if(error){ 
      console.log(error);
    }else{
     let BooksGrid =[];
     let colGrid = 3;
     for(let i =0; i<result.length; i+=colGrid){
         BooksGrid.push(result.slice(i,i+colGrid));
     }
     res.render('page/book', {title:'الكتب', items:result}); 
     console.log("this book");
   }

 });
}



addBook = function(req,res,next){ 

//  res.send({file:req.file.filename});
      if(!req.file){
        req.flash('error-add','أدخل صورة الكتاب رجاء');
        res.redirect('creators-new-book');
        return;
      }else{

      const newBook = new Book({
        b_name: req.body.Bname,
        writer: req.body.Rname,
        pages:  req.body.pages,
        b_date: req.body.date,
        b_pic : req.file.filename,
        prief: req.body.brife,
        publisher:req.user.c_name,
        status:false
      });

      console.log(req.file);
  
      newBook.save((error,result)=>{
  
        if(error){
          req.flash('error-add','something Wrong, Try later !');
          res.redirect('creators-new-book');
          return;
        }else{
          
          req.flash('error-add','تم الإضافة');
          res.redirect('creators-new-book')
           return;
        }
      });
    
      console.log('This: '+req.user._id);

    }
    
}

getBook = function(req,res,next){
  const publisher = req.user.c_name;
  if(req.user.c_type){
    Book.find({},(error,result)=>{
 
      if(error){ 
        console.log(error);
      }else{
        
       res.render('creator/Show-book', {title:'Show-Book', items:result,toLogin:true,status:true,admin:true,creator:publisher}); 
     }
  
   });
  }else{
    Book.find({publisher:req.user.c_name},(error,result)=>{
 
      if(error){ 
        console.log(error);
      }else{
        
       res.render('creator/Show-book', {title:'Show-Book', items:result,toLogin:true,status:true,admin:false,name:req.user.c_name,creator:publisher}); 
     }
  
   });
  }
 
}

getUsersBook = function(req,res,next){
  Book.find({_id:req.params.info},(error,result)=>{
 
    if(error){ 
      console.log(error);
    }else{
      res.render('page/book-detales',{title:' تفاصيل كتاب ', items:result}); 
   }

 });
}

getCreatorsBook = function(req,res,next){
  const publisher = req.user.c_name;
  const creator_type = req.user.c_type;


  Book.find({_id:req.params.info},(error,result)=>{
 
    if(error){ 
      console.log(error);
    }else{
      res.render('creator/det-book',{title:'معلومات الكتاب', items:result,toLogin:true,creator:publisher,Admin:creator_type}); 
   }

 });
}

getUpdateBook = function(req,res,next){
  const publisher = req.user.c_name;

  Book.find({_id:req.params.id},(error,result)=>{
 
    if(error){ 
      console.log(error);
    }else{
      res.render('creator/edit-book',{title:'معلومات الكتاب',items:result,toLogin:true,creator:publisher}); 
    }

 });
}

updateBook = function(req,res,next){
       let id = req.body.id;
        const BookUpdate = {
          b_name:req.body.Bname,
          writer:req.body.Rname,
          pages:req.body.pages,
          b_date:req.body.b_date,
          prief:req.body.brife
        
        }

      Book.updateOne({_id:id},{$set:BookUpdate},(error,doc)=>{
       if(error){
        console.log(error);
        return;
       }else{
        console.log(doc);
        res.redirect('creators-book');
      }

    });
  }

 Approve = function(req,res,next){
    const id = req.body.id;
   const Update = {
     status:true
   }

   Book.updateOne({_id:id},{$set:Update},(error,doc)=>{
    if(error){
     console.log(error);
     return;
    }else{
     console.log(doc);
     res.redirect('creators-book');
   }

 });
 }

 Delete = function(req,res,next){
  let id = req.body.id;
 

 Book.deleteOne({_id:id},(error,doc)=>{
  if(error){
   console.log('error',error);
   return;
  }else{
   console.log('Done',doc);
   res.redirect('creators-book');
 }

});

}

CreatorsDelete = function(req,res,next){
let id = req.body.id;
 

 Book.deleteOne({_id:id},(error,doc)=>{
  if(error){
   console.log('error',error);
   return;
  }else{
   console.log(doc);
   res.redirect('creators-book');
 }
 });
}

reports = function(req,res,next){

  Book.aggregate([
    {
      $group: { _id: "$publisher", count: { $sum: 1 } }
    }
],(error,doc)=>{
     if(error){
      console.log(error);
      return;
     }else{
      console.log(doc);
      res.render('creator/book-reports',{title:'تقارير الكتب',toLogin:true,items:doc})
     }
  });
}


module.exports = {
    getBooks:getBooks,
    addBook: addBook,
    getBook: getBook,
    getUsersBook: getUsersBook,
    getCreatorsBook:getCreatorsBook,
    getUpdateBook:getUpdateBook,
    updateBook:updateBook,
    Approve:Approve,
    Delete:Delete,
    CreatorsDelete:CreatorsDelete,
    reports:reports,
}




