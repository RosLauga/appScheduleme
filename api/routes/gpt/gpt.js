const { Router } = require("express");
const controllersGPT = require("../../controllers/gptRead");
const app = Router();

app.get("/schedulereading", controllersGPT.getReading);

module.exports = app;
