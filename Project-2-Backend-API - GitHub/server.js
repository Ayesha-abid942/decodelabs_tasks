const express = require("express");

const app = express();

app.use(express.json());

const users = [
    {
        id: 1,
        name: "Ali",
        email: "ali@gmail.com"
    },
    {
        id: 2,
        name: "Sara",
        email: "sara@gmail.com"
    }
];

// Home API
app.get("/", (req, res) => {
    res.json({
        message: "Project 2 Backend API is running!"
    });
});

// GET all users
app.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// GET single user
app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

// POST new user
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});