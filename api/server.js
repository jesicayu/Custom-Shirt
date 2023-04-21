const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes");
const models = require("./models");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("Server listening at port 3001 ");
  });
});
