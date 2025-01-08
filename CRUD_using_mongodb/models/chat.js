const mongoose = require("mongoose");

const chatschema = new mongoose.Schema({
    
    msg : {
        type : String,
        maxLength : 50
    },
        sender: {
            type: String,
            required: true
            },
            receiver: {
                type: String,
                required: true
                },

              createdate : {
                type: Date,
                default: new Date(),
                required:true

              }



})


const chat = mongoose.model("chat",chatschema);
module.exports = chat;