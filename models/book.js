const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
  
   b_name:{
       type:String,
       required:true
   },

   writer:{
    type:String,
    required:true
},

  
   pages:{
    type:Number,
    required:true
},

b_date:{
    type:Date,
    required:true
},


b_pic:{
    type:String,
    required:true
},

  

   prief:{
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
}
});

module.exports = mongoose.model('Books',BookSchema);