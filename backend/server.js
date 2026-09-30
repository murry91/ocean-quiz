// server.js
// The simplest possible Express server: one route that just proves
// the server is alive and reachable.

const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db"); // just requiring this runs db.js's setup code
const quizRouter = require("./routes/quiz");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Serve the frontend folder as static files
app.use(express.static(path.join(__dirname, "../frontend")));

//parses incoming JSON bodies before your routes run.
app.use(express.json());

app.get("/api/ping", (req, res) => {
  res.json({ ok: true });
});

app.use("/api", quizRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});