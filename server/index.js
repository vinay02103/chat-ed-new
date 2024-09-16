const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/user");
const chatRoutes = require("./routes/message");
const socket = require("socket.io");

dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection Successful"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

const server = app.listen(port, () => console.log(`Server running at ${port}`));
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-received", data.message);
    }
  });
});
