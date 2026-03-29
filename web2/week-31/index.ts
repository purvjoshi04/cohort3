import client  from 'prom-client';
import express from "express";
import { metricsMiddleware} from "./metrics/middleware";

const app = express();
app.use(metricsMiddleware)

app.get("/cpu", (req, res) => {
    for (let i = 0; i < 1000000; i++) {
        Math.random();
    }

    res.json({
        message: "cpu"
    })
});

app.get("/user", async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    res.send({
        name: "John Doe",
        age: 25,
    });
});

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
});


app.listen(5001);