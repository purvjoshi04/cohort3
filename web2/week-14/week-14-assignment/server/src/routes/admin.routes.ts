import { Router } from "express";
import z from "zod";
import bcrypt from "bcrypt";
import { adminModel, courseModel } from "../db/db.js";
import jwt from "jsonwebtoken";
import { adminMiddleware } from "../middleware/admin.middleware.js";

export const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
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
        const userExisted = await adminModel.findOne({ email });

        if (userExisted) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
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
    email: z.email({ message: "Invalid email format" }),
    password: z.string().min(1, { message: "Password is required" })
});

adminRouter.post("/signin", async (req, res) => {
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

        const admin = await adminModel.findOne({
            email: email,
        });

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const passwordCompare = await bcrypt.compare(password, admin.password as string);

        if (!passwordCompare) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            process.env.JWT_ADMIN_SECRET!,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            success: true,
            message: "Signed in successfully",
            token: token,
            user: {
                id: admin._id,
                email: admin.email
            }
        })
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong during signin"
        });
    }
});


const createCourseSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    imageUrl: z.url("Must be a valid URL"),
    price: z.number().positive("Price must be positive")
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.userId;
        const parsedData = createCourseSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: parsedData.error.issues
            });
        }

        const { title, description, imageUrl, price } = parsedData.data;

        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully!",
            course: {
                id: course._id,
                title: course.title,
                price: course.price
            }
        });

    } catch (error) {
        console.error("Course creation error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course"
        });
    }
});

adminRouter.get("/course/all", adminMiddleware, async (req, res) => {
    try {
        const adminId = req.userId;

        const courses = await courseModel.find({
            creatorId: adminId
        }).select('-__v');

        return res.status(200).json({
            success: true,
            message: "Your all courses",
            courses,
            count: courses.length
        });

    } catch (error) {
        console.error("Get courses error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses"
        });
    }
});