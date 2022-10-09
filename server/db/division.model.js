const EmployeeSchema = require("./employee.model")

//ODM
//http://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;
//const Schema = mongoose.Schema

const DivisionSchema = new Schema({
  name: String,
  boss: {type: Schema.Types.ObjectId, ref: "Employee"},
  budget: Number,
  location: {
    city: String,
    country: String,
  },
});

module.exports = mongoose.model("Division", DivisionSchema);
