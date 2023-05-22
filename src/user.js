const mongoose = require("mongoose");
const listUser = mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  id: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  face: {
    type: String,
  },
  git: {
    type: String,
  },
  twitter: {
    type: String,
  },
  youtube: {
    type: String,
  },
  insta: {
    type: String,
  },
});

const user = mongoose.model("user", listUser);

module.exports = user;
