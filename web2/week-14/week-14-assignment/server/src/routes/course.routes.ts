import { Router } from "express";
import { userMiddleware } from "../middleware/user.middleware.js";
import { courseModel, purchaseModel } from "../db/db.js";

export const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        const course = await courseModel.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        const existingPurchase = await purchaseModel.findOne({
            userId,
            courseId
        });

        if (existingPurchase) {
            return res.status(400).json({
                success: false,
                message: "You have already purchased this course"
            });
        }

        await purchaseModel.create({
            userId,
            courseId
        });

        return res.status(201).json({
            success: true,
            message: "You have successfully bought the course"
        });

    } catch (error) {
        console.error("Purchase error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to purchase course"
        });
    }
});

courseRouter.get('/preview', async (req, res) => {
    try {
        const courses = await courseModel.find({}).select('-__v'); 

        return res.status(200).json({
            success: true,
            courses,
            count: courses.length
        });

    } catch (error) {
        console.error("Preview error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch courses"
        });
    }
});