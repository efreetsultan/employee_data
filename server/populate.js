//Loading the .env file and create environment variables from it
require("dotenv").config();
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //exit the current program
}

const main = async () => {
  await mongoose.connect(mongoUrl);
  await EmployeeModel.deleteMany({});
  await EmployeeModel.create(
    { name: "Keanu Reeves", level: "Senior", position: "Main actor", array:[{object1: 1, object2: "zz"}, {object1: 5, object: "zgdhrz"}] },
    { name: "Edward Norton", level: "Master", position: "Director", array:[] },
    { name: "Scarlet Johansson", level: "Medior", position: "Love Interest", array:[] },
    { name: "Tom Holland", level: "Junior", position: "Antagonist", array:[] }
  );
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
