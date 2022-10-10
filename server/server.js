require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const employeesRouter = require("./routes/employees.router");
const divisionsRouter = require("./routes/division.router");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //exit the current program
}

const app = express();

app.use(express.json());

app.use("/api/employees", employeesRouter);
app.use("/api/divisions", divisionsRouter);

const main = async () => {
  await mongoose.connect(mongoUrl);
  app.listen(8080, () => {
    console.log("App is listening on 8080"),
      console.log("Try /employees route now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
