const mongoose = require('mongoose');
const RequestSchema = mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

    date:{
        type:Date,
        required: true
    },

    sender:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Requests',RequestSchema);