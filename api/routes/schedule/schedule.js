const { Router } = require("express");
const controllerSchedule = require("../../controllers/schedule.js");
const app = Router();

app.get("/schedule", controllerSchedule.getSchedule);
app.post("/schedule", controllerSchedule.postSchedule);

module.exports = app;
