const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const chat = require("./models/chat");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

// Database Connection
main().then(() => {
    console.log("Connection successful");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// Middleware
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.send("Root working");
});

// Display all chats
app.get("/chats", async (req, res) => {
    let chats = await chat.find();
    res.render("index.ejs", { chats });
});

// Render new chat form
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Create new chat
app.post("/chats", async (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new chat({
        sender: from,
        receiver: to,
        msg: msg,
        
    });
    try {
        await newChat.save();
        console.log("Chat was saved");
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.send("Error saving chat");
    }
});

// Render edit chat form
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chatData = await chat.findById(id);
    res.render("edit.ejs", { chatData });
});

// Update chat
app.patch("/chats/:id", async (req, res) => {
    let { newfrom, newmsg, newto } = req.body;
    let { id } = req.params;
    await chat.findByIdAndUpdate(id, { 
        sender: newfrom, 
        msg: newmsg, 
        receiver: newto 
    });
    res.redirect("/chats");
});

// Delete chat
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
