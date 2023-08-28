const { Router } = require("express");
const routes = Router();
const schedule = require("../routes/schedule/schedule");
const gpt = require("../routes/gpt/gpt");

routes.use(schedule);
routes.use(gpt);

module.exports = routes;
