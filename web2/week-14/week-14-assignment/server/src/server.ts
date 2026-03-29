import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.route.js";
import { adminRouter } from "./routes/admin.routes.js";
import { courseRouter } from "./routes/course.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/course", courseRouter);


mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server Running on Port: http://localhost:${process.env.PORT}`)
        })
    }).catch((e) => console.log(`${e} did not connect!!`))
