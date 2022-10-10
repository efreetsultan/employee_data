//Loading the .env file and create environment variables from it
require("dotenv").config();
const mongoose = require("mongoose");
const DivisionModel = require("./db/division.model");
const toId = mongoose.Types.ObjectId;

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); //exit the current program
}

const main = async () => {
  await mongoose.connect(mongoUrl);
  await DivisionModel.deleteMany({});
  await DivisionModel.create({
    name: "The Division",
    boss: "634429ce22c5d402dc23c6af",
    budget: 1000,
    location: {
      city: "Budapest",
      country: "Hungary",
    },
  });
  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
