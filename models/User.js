const mongoose = require("../db/connection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

UserSchema.method("comparePassword", function(dbpassword, password) {
  console.log(password, dbpassword);
  return new Promise((resolve, reject) => {
    bcrypt.compare(dbpassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
});

mongoose.model("User", UserSchema);

module.exports = mongoose;
