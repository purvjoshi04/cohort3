import express, { response } from "express";
import { UserModel, TodoModel } from "./db.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { auth } from "./middleware.js"
import bcrypt from "bcrypt";
import { z, ZodError } from "zod";

dotenv.config({ path: './.env' })


mongoose.connect(process.env.mongodb_url)

const app = express();
app.use(express.json())

app.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email({ message: "Invalid email format" }),
        name: z.string(),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters" })
            .max(10, { message: "Password must be at most 10 characters" })
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

    const { email, name, password } = parsedData.data;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        await UserModel.create({
            email,
            name,
            password: hashedPassword
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

app.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email
    });

    if (!user) {
        res.status(403).json({
            message: "User does not exist in our DB."
        })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (passwordCompare) {
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Wrong credentials!"
        })
    }
});

app.post("/todo", auth, async function (req, res) {
    const userId = req.userId;
    const title = req.body.title;

    await TodoModel.create({
        userId,
        title,
    });

    res.json({
        message: "Todo created"
    })
});

app.get("/todos", auth, async (req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId,
    });

    res.json({
        todos: todos
    })

});


app.listen(3000);