const bcrypt = require("bcrypt");

const cryptPass = (pass) => {
  return bcrypt.hashSync(pass, bcrypt.genSaltSync(10));
};

const checkPass = (pass, passHash) => {
  return bcrypt.compareSync(pass, passHash);
};

module.exports = {
  cryptPass,
  checkPass,
};
