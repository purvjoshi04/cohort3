import express from "express";

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

app.post("/verify-otp", (req, res) => {
    const {email, otp, newPassword} = req.body;

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
