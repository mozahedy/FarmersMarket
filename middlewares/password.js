const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;

module.exports.encrypt = async function (req, res, next) {
  const password = req.body.password;
  await bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword) => {
      req.body.password = hashedPassword;
      next();
  }).catch(err=>{
      next(err);
  });
};

