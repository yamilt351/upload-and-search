const mongoose = require("mongoose");
const {Schema} = require("mongoose");

//peopleSchema is used to store user information in the database.
const peopleSchema = new Schema({
  name: {type: String, required: true},
  country: {type: String, required: true},
  email: {type: String, required: true, unique:true},
  skills: {type: String, required: true},
  description: {type: String, required: true},
});
module.exports = mongoose.model("People", peopleSchema);
