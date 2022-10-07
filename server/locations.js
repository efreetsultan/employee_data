//Loading the .env file and create environment variables from it
require("dotenv").config();
const mongoose = require("mongoose");
const LocationsModel = require("./db/locations.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //exit the current program
}

const main = async () => {
  await mongoose.connect(mongoUrl);
  await LocationsModel.deleteMany({});
  await LocationsModel.create(
    { city: "Budapest", country: "Hungary"},
    { city: "Szombathely", country: "Hungary" },
    { city: "London", country: "England" },
    { city: "Berlin", country:"UK"}
  );
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
