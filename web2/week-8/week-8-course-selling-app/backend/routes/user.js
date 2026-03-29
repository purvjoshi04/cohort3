const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { userModel, purchaseModel, courseModel } = require("../db/db.js");
const { userMiddleware } = require("../middleware/user.js");

const userRouter = Router();

userRouter.post('/signup', async (req, res) => {
    const requiredBody = z.object({
        email: z.email({ message: "Invalid email format" }),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters" })
            .refine((password) => /[A-Z]/.test(password), {
                message: "Password must contain at least one uppercase letter",
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Password must contain at least one lowercase letter",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Password must contain at least one number",
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
                message: "Password must contain at least one special character (!@#$%^&*)",
            }),
    });

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        const formattedErrors = parsedData.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
        }));

        return res.status(400).json({
            message: "Validation failed",
            errors: formattedErrors
        });
    }

    const { email, password } = parsedData.data;

    try {
        const userExisted = await userModel.findOne({ email });
        if (userExisted) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "You are signed up!"
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Something went wrong during signup"
        });
    }
});

userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email: email,
        });

        if (!user) {
            return res.status(403).json({
                message: "User does not exist in our DB."
            });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (passwordCompare) {
            const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_USER_SECRET);
            res.json({
                token: token
            });
        } else {
            res.status(403).json({
                message: "Wrong credentials!"
            });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            message: "Something went wrong during login"
        });
    }
});


userRouter.get('/purchases', userMiddleware, async (req, res) => {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });
    const courseData = await courseModel.find({
        _id: { $in: purchases.map(id => id.courseId) }
    })
    res.json({
        purchases,
        courseData
    });
});

module.exports = {
    userRouter: userRouter
};