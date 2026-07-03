import express from "express";
import dotenv from "dotenv";

dotenv.config({});

const app = express();
app.use(express.json());


let validOtps = {} as any;

app.post("/generate-otp", (req, res) => {
    const email = req.body.email;
    const otp = Math.floor(100000 + Math.random() * 900000);

    validOtps[email] = otp;

    console.log(`otp for ${email} is ${otp}`);

    res.json({
        message: "Email has been sent"
    });
});

app.post("/verify-otp", async (req, res) => {
    const {email, otp, newPassword, token} = req.body;

    let formData = new FormData();
    formData.append('secret', process.env.SECRET_KEY!);
    formData.append('response', token);

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    const result = await fetch(url, {
        body: formData,
        method: 'POST'
    });

    const challengeSucceeded = ((await result.json()) as { success: boolean }).success;

    if (!challengeSucceeded) {
        return res.status(403).json({
            message: "You are a bot"
        });
    }

    if(validOtps[email] == otp) {
        console.log(`Password reset for user ${email} with ${newPassword}`);
        res.json({
            success: true
        })
    } else {
        console.log("Incorrect input");
        res.json({
            success: false
        })
    }
});


app.listen(3000);
