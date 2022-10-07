//ODM
//http://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;
//const Schema = mongoose.Schema

const LocationsSchema = new Schema({
    city: String,
    country: String,
});

module.exports = mongoose.model("Locations", LocationsSchema);
