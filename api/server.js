const express = require("express");
const routes = require("./routes/routes");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(routes);

app.listen(4000, () => {
  console.log("Server running at 4000 port");
});
