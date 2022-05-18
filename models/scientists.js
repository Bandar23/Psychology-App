const mongoose = require("mongoose");

const ScientistsSchema = mongoose.Schema({
   name:{
       type:String,
       required:true
   },
   pic:{
       type:String,
       required:true
   },

   content:{
       type:String,
       required:true
   },

   publisher:{
       type:String,
       required:true
   },
   status:{
       type:Boolean,
       required:true
   },

   likes:{
       type:Number
   }
});



module.exports = mongoose.model('Scientists',ScientistsSchema);