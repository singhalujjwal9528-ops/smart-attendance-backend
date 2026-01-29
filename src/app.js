
const express = require("express");
const cors = require("cors");

// 🔥 IMPORTANT
const sessionRoutes = require("./routes/session.routes");
const attendanceRoutes = require("./routes/attendance.routes");


const app = express();

app.use(cors());
app.use(express.json());

// 🔥 THIS LINE ENABLES /api/session/*
app.use("/api/session", sessionRoutes);
app.use("/api/attendance", attendanceRoutes);


// test route (keep this for debugging)
app.post("/test", (req, res) => {
  res.json({ message: "POST works", body: req.body });
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
