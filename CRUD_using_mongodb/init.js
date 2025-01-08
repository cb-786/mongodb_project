const mongoose = require("mongoose");
const chat = require("./models/chat");

main().then(()=> {
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}


let allchats = [
    {
      receiver: "riya",
      sender: "kunal",
      msg: "सो जाओ अब",
     
    },
    {
      receiver: "diya",
      sender: "chirag",
      msg: "घट पढ़ेया कर",
      
    },
    {
      receiver: "jiya",
      sender: "samir",
      msg: "क्या हाल है?",
      
    },
    {
      receiver: "piya",
      sender: "rohan",
      msg: "आज क्या कर रहे हो?",
     
    },
    {
      receiver: "riya",
      sender: "kunal",
      msg: "कैसे हो आप?",
      
    },
  ];

  chat.insertMany(allchats);