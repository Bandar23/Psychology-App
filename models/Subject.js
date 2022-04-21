const mongoose = require('mongoose');

const SubjectSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    Date:{
        type:Date,
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

module.exports = mongoose.model('Subjects',SubjectSchema);