const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/securechat")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = new Set();

io.on("connection", async (socket) => {
  console.log("🟢 New user connected:", socket.id);

  socket.on("join", async (username) => {
    socket.username = username;
    onlineUsers.add(username);
    io.emit("onlineUsers", Array.from(onlineUsers));

    const recentMessages = await Message.find().sort({ timestamp: 1 }).limit(50);
    socket.emit("loadMessages", recentMessages);
  });

  socket.on("message", async (data) => {
    const { sender, text } = data;
    const newMsg = new Message({ sender, text, timestamp: new Date() });
    await newMsg.save();
    io.emit("message", newMsg);
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      onlineUsers.delete(socket.username);
      io.emit("onlineUsers", Array.from(onlineUsers));
    }
    console.log("🔴 User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
