const mongoose = require("mongoose");

mongoose.connect("");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  password: String,
});

const accountSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  balance: Number,
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
