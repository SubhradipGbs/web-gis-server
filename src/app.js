const express = require("express");
const { fetchAllLandRecords } = require("./controllers/landRecordController");
const authRouter = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const landRoute = require("./routes/landRoutes");
const cors = require("cors");
const requestLogger = require("./middlewares/requestLogger");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);

app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.get("/land-all", fetchAllLandRecords);
app.use("/land", landRoute);
app.use("/auth", authRouter);
app.use("/user", userRoute);

module.exports = app;
