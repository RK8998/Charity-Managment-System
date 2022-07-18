const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    payment : {
        type : String
    },
    mobile : {
        type : Number
    },
    upi : {
        type : String
    },
    bank : {
        type : String
    },
    account : {
        type : Number
    },
    ifsc : {
        type : String
    }
});

module.exports = mongoose.model("payments",PaymentSchema);