const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    category : {
        type:String
    },
    details : {
        type : String
    }
});

module.exports = mongoose.model("categories",categorySchema);