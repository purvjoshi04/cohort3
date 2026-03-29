import express from "express";

const app = express();

app.use(express.json());

const user = [
  {
    userName: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const johnKidneys = user[0].kidneys;
  const healthyKidneys = johnKidneys.filter((k) => k.healthy === true);
  const unhealthyKidneys = johnKidneys.filter((k) => k.healthy === false);
  res.send({
    johnKidneys: johnKidneys.length,
    healthyKidneys: healthyKidneys.length,
    unhealthyKidneys: unhealthyKidneys.length,
  });
});

app.post("/addKidneys", (req, res) => {
  const isHealthy = req.body.isHealthy;
  user[0].kidneys.push({
    healthy: isHealthy,
  });
  const johnKidneys = user[0].kidneys;
  const healthyKidneys = johnKidneys.filter((k) => k.healthy === true);
  const unhealthyKidneys = johnKidneys.filter((k) => k.healthy === false);
  res.send({
    johnKidneys: johnKidneys.length,
    healthyKidneys: healthyKidneys.length,
    unhealthyKidneys: unhealthyKidneys.length,
  });
});

app.put("/updateKidneys", (req, res) => {
  for (let i = 0; i < user[0].kidneys.length; i++) {
    user[0].kidneys[i].healthy = true;
  }
  res.send("updated");
});

app.delete("/removeKidneys", (req, res) => {
  let newKidneys = [];
  for (let i = 0; i < user[0].kidneys.length; i++) {
    if (user[0].kidneys[i].healthy) {
      newKidneys.push({
        healthy: true,
      });
    }
  }
  user[0].kidneys = newKidneys;
  res.json({ message: "removed unhealthy kidney!" });
});

app.listen(3003);
