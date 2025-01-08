<!-- README.md -->

# CRUD on MongoDB

This project demonstrates how to implement CRUD (Create, Read, Update, Delete) operations in a MongoDB database using **Node.js**, **Express**, and **Mongoose**. The application simulates a chat management system where users can add, edit, view, and delete chat messages.

---

## Features
- Database connection with **MongoDB**.
- Organized code structure with separate folders for models and initialization scripts.
- Middleware for handling method overrides.
- Asynchronous database operations using **async/await**.
- Dynamic routing for handling CRUD actions.

---

## Routes/Paths
- **GET /** - Test route to confirm root is working.
- **GET /chats** - Fetch and display all chats.
- **GET /chats/new** - Render form to create a new chat.
- **POST /chats** - Add a new chat to the database.
- **GET /chats/:id/edit** - Render form to edit an existing chat.
- **PATCH /chats/:id** - Update an existing chat in the database.
- **DELETE /chats/:id** - Delete a chat from the database.

---

## Learning Highlights
### 1. Database Connection with MongoDB
- Connected MongoDB with **mongoose.connect()**.
- Used **async/await** to handle asynchronous operations.
```javascript
await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
```

### 2. Organized Code Structure
- Created a **models** folder to store schemas for database collections.
- Added an **init.js** file for one-time data initialization.

### 3. CRUD Operations
- **Create**: Used **.save()** to insert a new chat.
```javascript
let newChat = new chat({ sender: from, receiver: to, msg: msg });
await newChat.save();
```
- **Read**: Used **find()** to fetch all chats.
```javascript
let chats = await chat.find();
```
- **Update**: Used **findByIdAndUpdate()** to modify an existing chat.
```javascript
await chat.findByIdAndUpdate(id, { sender: newfrom, msg: newmsg, receiver: newto });
```
- **Delete**: Used **findByIdAndDelete()** to remove a chat.
```javascript
await chat.findByIdAndDelete(id);
```

### 4. Middleware Usage
- Integrated **method-override** to support PATCH and DELETE HTTP methods.
```javascript
app.use(methodOverride('_method'));
```

### 5. Views with EJS
- Implemented dynamic views using **EJS** templates.

---


## Initialization Script - init.js
This script runs only once to populate the database with initial data.
```javascript
const mongoose = require('mongoose');
const chat = require('./models/chat');

async function init() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    let sampleChats = [
        { sender: 'Alice', receiver: 'Bob', msg: 'Hello Bob!' },
        { sender: 'Bob', receiver: 'Alice', msg: 'Hi Alice!' }
    ];
    await chat.insertMany(sampleChats);
    console.log('Database initialized!');
}

init().then(() => mongoose.disconnect());
```

---

## Getting Started
### 1. Install Dependencies
```
npm install express mongoose ejs method-override
```

### 2. Start Server
```
node index.js
```

### 3. Initialize Database (Run only once)
```
node init.js
```

### 4. Access Application
Open [http://localhost:8080/chats](http://localhost:8080/chats) in your browser.

---

## Conclusion
This project provided hands-on experience with MongoDB and Express for building CRUD applications. It emphasized code organization, asynchronous programming, and effective use of middleware. Future improvements could include user authentication, validation, and additional features like real-time messaging.
