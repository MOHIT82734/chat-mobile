const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working fine!" });
});


// ✅ MongoDB connect
mongoose
  .connect("mongodb://localhost:27017/ChatApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected..."))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ✅ Register
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ msg: "User registered ✅" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Login
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Get all users
app.get("/users", async (req, res) => {
  const users = await User.find({}, "name email");
  res.json(users);
});

// ✅ Get messages
app.get("/messages/:userName", async (req, res) => {
  const { userName } = req.params;
  const messages = await Message.find({ userName });
  res.json(messages);
});

// ✅ Save message
app.post("/messages", async (req, res) => {
  const { userName, text, sender } = req.body;
  const msg = new Message({ userName, text, sender });
  await msg.save();
  res.json(msg);
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
