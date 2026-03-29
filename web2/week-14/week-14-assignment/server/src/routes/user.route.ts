import { Router } from "express";
import z from "zod";
import bcrypt from "bcrypt"
import { courseModel, purchaseModel, userModel } from "../db/db.js";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/user.middleware.js";

export const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.email({ message: "Invalid email format" }),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters" })
            .refine((password) => /[A-Z]/.test(password), {
                message: "Password must contain at least one uppercase letter"
            })
            .refine((password) => /[a-z]/.test(password), {
                message: "Password must contain at least one lowercase letter",
            })
            .refine((password) => /[0-9]/.test(password), {
                message: "Password must contain at least one number",
            })
            .refine((password) => /[!@#$%^&*]/.test(password), {
                message: "Password must contain at least one special character (!@#$%^&*)",
            })
    });

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        const formattedErrors = parsedData.error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
        }));
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formattedErrors
        });
    }

    const { email, password } = parsedData.data;

    try {
        const userExisted = await userModel.findOne({ email });

        if (userExisted) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            success: true,
            message: "You are signed up!"
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during signup"
        });
    }
});

const signinSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password is required" })
});
userRouter.post("/signin", async (req, res) => {
    try {

        const parsedData = signinSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsedData.error.issues
            });
        }

        const { email, password } = parsedData.data;

        const user = await userModel.findOne({
            email: email,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const passwordCompare = await bcrypt.compare(password, user.password as string);

        if (!passwordCompare) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_USER_SECRET!,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            success: true,
            message: "Signed in successfully",
            token: token,
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during signin"
        });
    }
})


userRouter.post("/purchase", userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        const purchases = await purchaseModel.find({
            userId
        });

        const courseData = await courseModel.findOne({
            _id: { $in: purchases.map(id => id.courseId) }
        });

        res.json({
            purchases,
            courseData
        });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during purchasing course"
        });
    }
});