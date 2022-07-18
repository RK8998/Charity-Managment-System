const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    add:{
        type:String,
        require:true,
    },
    pincode:{
        type:Number,
        require:true,
    },
    city:{
        type:String,
        require:true,
    },
    state:{
        type:String,
        require:true,
    },
    mobile:{
        type:Number,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    cpassword:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
    }    
});

module.exports = mongoose.model('users',userSchema);