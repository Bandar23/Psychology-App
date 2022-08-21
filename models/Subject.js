const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    pic:{
        type:String,
        require:true
    },

    content:{
        type:String,
        required:true
    },

    Date:{
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

module.exports = mongoose.model('Subjects',SubjectSchema);