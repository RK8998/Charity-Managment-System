const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    mobile : {
        type : Number,
        require : true
    }
});

module.exports = mongoose.model('admins', adminSchema);