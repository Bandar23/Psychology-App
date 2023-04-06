let mongoose   = require('mongoose');
let StandarsSchema = new mongoose.Schema({



    Qus:[{
        q:{type:String},
       
    }],

    name:{
        type:String,
        required:true
    }, 

    answers:[{
        a:{type:String},
        val:{type:Number},
    }],

    des:{
        type:String,
        required:true
    }, 
});

module.exports = mongoose.model('Standars',StandarsSchema);