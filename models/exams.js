let mongoose   = require('mongoose');
let testSchema = new mongoose.Schema({


    title:{
        type:String,
        required:true
    },

    info:{
        type:String,
        required:true
    },

    header:{
        type:String,
        required:true
    },

    publisher:{
        type:String,
        required:true
    },

    time:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tests',testSchema);