const { Router } = require("express");
const adminRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { z } = require("zod");
const { adminModel, courseModel } = require("../db/db.js");
const { adminMiddleware } = require("../middleware/admin.js");

adminRouter.post('/signup', async (req, res) => {
    const requiredBody = z.object({
        email: z.string().email({ message: "Invalid email format" }),
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
        const userExisted = await adminModel.findOne({ email });
        if (userExisted) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
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
})

adminRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({
            email: email,
        });

        if (!admin) {
            return res.status(403).json({
                message: "User does not exist in our DB."
            });
        }

        const passwordCompare = await bcrypt.compare(password, admin.password);

        if (passwordCompare) {
            const token = jwt.sign({ id: admin._id.toString() }, process.env.JWT_ADMIN_SECRET);
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
})


adminRouter.post('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })
    res.json({
        message: "Course created!",
        courseId: course._id
    })
})

adminRouter.put('/course', adminMiddleware, async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title,
        description,
        imageUrl,
        price,
        creatorId: adminId
    })
    res.json({
        message: "Course updated!",
        courseId: course._id
    })
})

adminRouter.get('/course/all', adminMiddleware, async (req, res) => {
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        message: "Your all course",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
};