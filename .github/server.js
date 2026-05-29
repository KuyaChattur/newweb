const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
}); 

// REGISTER
app.post("/register", (req, res) => {
  const { username, password } = req.body; 

  db.run(
    "INSERT INTO users (username, password) VALUES (?, ?)", 
    [username, password],
    function (err) {
      if (err) {
        return res.json({ success: false, message: "User already exists ❌" });
      }
      res.json({ success: true, message: "Registered successfully ✅" });
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, user) => {
      if (user) {
        res.json({ success: true, message: "Login successful 🚀" });
      } else {
        res.json({ success: false, message: "Invalid login ❌" });
      }
    }
  );
});

// 🔥 IMPORTANT: START SERVER
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
