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
    { name: "Keanu Reeves", level: "Senior", position: "Main actor", startingDate: 2020-01-05, favoriteColor: "Red", currentSalary: 5000, desiredSalary: 6000 },
    { name: "Edward Norton", level: "Master", position: "Director",startingDate: 2020-01-05, favoriteColor: "Red", currentSalary: 5000, desiredSalary: 6000 },
    { name: "Scarlet Johansson", level: "Medior", position: "Love Interest",startingDate: 2020-01-05, favoriteColor: "Red", currentSalary: 5000, desiredSalary: 6000 },
    { name: "Tom Holland", level: "Junior", position: "Antagonist",startingDate: 2020-01-05, favoriteColor: "Red", currentSalary: 5000, desiredSalary: 6000 }
  );
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
