const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Simulated database
const db = {
  users: [
    {
      id: 1,
      shortId: "john",
      username: "john",
      password: "password123",
    },
    {
      id: 2,
      shortId: "jane",
      username: "jane",
      password: "password456",
    },
  ],
};

const app = express();
app.use(express.json());
app.use(cors({ credentials: true }));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:8085");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

const SECRET_KEY = "your-secret-key";

// Authenticate user
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simulate database query to find user
  const user = db.users.find((user) => user.username === username);

  // Check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Compare passwords
  if (password === user.password) {
    return res.json({
      shortId: user.shortId,
    });
  } else {
    return res.status(401).json({ message: "Invalid password" });
  }

  // bcrypt.compare(password, user.password, (err, result) => {
  //   console.log(err, result);
  //   if (err || !result) {
  //     return res.status(401).json({ message: "Invalid password" });
  //   }

  //   // Generate JWT token
  //   const token = jwt.sign({ id: user.id }, SECRET_KEY);

  //   // Return the token
  //   return res.json({
  //     shortId: user.shortId,
  //   });
  // });
});

app.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;
    next();
  });
}

// Start the server
app.listen(8085, () => {
  console.log("Server is running on port 8085");
});
