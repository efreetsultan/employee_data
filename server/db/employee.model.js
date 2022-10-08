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
  notes: {
    someShit: String,
    moreShit: String,
  }
});

module.exports = mongoose.model("Employee", EmployeeSchema);
