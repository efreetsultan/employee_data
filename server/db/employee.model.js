//ODM
//http://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;
//const Schema = mongoose.Schema

const ArraySchema = new Schema({
  object1: Number,
  object2: String,
});
const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  array: [ArraySchema],
});

module.exports = mongoose.model("Employee", EmployeeSchema);
