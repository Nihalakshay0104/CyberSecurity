# 💬 Secure Chat App

A simple end-to-end chat application built with **React**, **Node.js**, **Express**, **Socket.io**, and **MongoDB**.  
It supports **real-time messaging**, **user authentication**, **online indicators**, and **persistent chat history**.

---

## 🚀 Features

- 🔐 User registration and login (with JWT authentication)
- 💬 Real-time messaging using Socket.io
- 🕒 Messages saved in MongoDB with timestamps
- 🟢 Online user indicator (shows who’s active)
- 📜 Auto-load last 50 messages when joining
- ⚡ Built with MERN stack (MongoDB, Express, React, Node)
- ✨ Modern UI using React and inline styles

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Socket.io-client |
| Backend | Node.js + Express |
| Realtime | Socket.io |
| Database | MongoDB (Mongoose ORM) |
| Auth | JWT + bcrypt |

---

## 🧩 Folder Structure

```
secure-chat-app/
│
├── backend/
│   ├── server.js               # Main backend server (Express + Socket.io)
│   ├── models/
│   │   └── Message.js          # Message schema (MongoDB)
│   ├── routes/
│   │   └── authRoutes.js       # Login & register endpoints
│   ├── controllers/
│   ├── config/
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js              # Login + navigation
│   │   ├── Chat.js             # Real-time chat interface
│   │   └── utils/
│   │       └── encryption.js   # Optional AES/RSA encryption logic
│   ├── public/
│   └── package.json
│
└── README.md                   # You’re reading this 🙂
```

---

## ⚙️ Installation

### 🖥️ 1. Clone or Extract the Project

If you downloaded it as a ZIP, extract it.  
Otherwise, if you cloned via Git:
```bash
git clone https://github.com/CyberSecurity.git
cd secure-chat-app
```

---

### ⚙️ 2. Install Backend Dependencies

```bash
cd backend
npm install
```

Start the backend:
```bash
node server.js
```

Expected output:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

---

### 💻 3. Install Frontend Dependencies

Open a new terminal:
```bash
cd ../frontend
npm install
npm start
```

Frontend will start at:
👉 http://localhost:3000

---

## 🔌 MongoDB Setup

Make sure MongoDB is running locally on your computer:
```
mongodb://127.0.0.1:27017/securechat
```

If you’re using MongoDB Compass, you can view messages in the `securechat` database → `messages` collection.

---

## 🧠 How It Works

- User logs in (or registers) → JWT token generated (if implemented).
- Client connects to Socket.io (`http://localhost:5000`).
- Chat messages are sent via Socket.io and broadcast to all users.
- Each message is stored in MongoDB with:
  ```json
  { sender: "username", text: "message", timestamp: "2025-10-23T10:00:00Z" }
  ```
- Online users list updates dynamically.

---

## 🪄 Future Enhancements

- ✉️ Typing indicators (“user is typing…”)
- 🔏 End-to-end encryption using AES or RSA
- 📱 Responsive mobile layout
- 🧑‍🤝‍🧑 Private 1-to-1 chats

---

## 🧑‍💻 Developer

**Author:** Nihalakshay  
**Stack:** MERN (MongoDB, Express, React, Node.js)  
**License:** MIT

---

## 🧭 Quick Start Commands Summary

```bash
# Start backend
cd backend
npm install
node server.js

# Start frontend
cd ../frontend
npm install
npm start
```

Then open **http://localhost:3000** and start chatting!
