const DivisionSchema = require("./division.model")

//ODM
//http://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;
//const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  location: String,
  startingDate: Date,
  favoriteColor: String,
  currentSalary: Number,
  desiredSalary: String,
  // divisions: {type: Schema.Type.ObjectId, ref: "Division"}
    
});

module.exports = mongoose.model("Employee", EmployeeSchema);
