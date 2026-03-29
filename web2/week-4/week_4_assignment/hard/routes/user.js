const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Todo} = require("../database/index.js")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config("./.env");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    await User.create({
        email,
        name,
        password
    });

    res.json({
        message: "You are signed up!"
    })
});

router.post('/login', async (req, res) => {
    // Implement user login logic
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        password: password
    });

    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        }, process.env.JWT_SECRET)
        res.json({
            token: token
        });
    } else {
        res.json({
            message: "Wrong crendetials!"
        })
    }
});

router.get('/todos', userMiddleware, async (req, res) => {
    // Implement logic for getting todos for a user
    const userId = req.userId;
    const todos = await Todo.find({
        userId
    });

    res.json({
        todos: todos
    })
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
    res.json({
        message: "Logged out successfully!"
    })
});

module.exports = router