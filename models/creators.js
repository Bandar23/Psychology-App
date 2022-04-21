const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CreatorSchema = mongoose.Schema({
 
    c_name:{
        type:String,
        required:true
    },

    c_email:{
        type:String,
        required:true
    },

    c_password:{
        type:String,
        required:true
    },

    c_username:{
        type:String,
        required:true
    },
    c_type:{
        type:Boolean,
        required:true
    },

    author:{
        type:Boolean,
        required:true
    }
});


CreatorSchema.methods.hashPasswprd = function(c_password){
    return bcrypt.hashSync(c_password,bcrypt.genSaltSync(5),null)
}


CreatorSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.c_password);
}

module.exports = mongoose.model('creators',CreatorSchema);