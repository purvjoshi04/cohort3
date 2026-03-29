import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
});

const courseSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    imageUrl: String,
    creatorId: mongoose.Schema.Types.ObjectId
})

const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
})

const purchaseSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    courseId: mongoose.Schema.Types.ObjectId
})

export const userModel = mongoose.model("user", userSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const adminModel = mongoose.model("admin", adminSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);