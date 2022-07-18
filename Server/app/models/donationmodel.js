const mongoose = require('mongoose');

const DonationSchema = mongoose.Schema({
    email : {
        type : String
    },
    name : {
        type : String
    },
    dcategory : {
        type : String
    },
    payment : {
        type : String
    },
    trid : {
        type : String
    },
    amount : {
        type : Number
    },
    date : {
        type : String
    },
});

module.exports = mongoose.model("donation",DonationSchema);