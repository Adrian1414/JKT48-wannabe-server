const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    const verify = verifyToken(access_token);
    const find = await User.findByPk(verify.id);

    if (!find) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: find.id,
      username: find.username,
      email: find.email,
      status: find.status
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports =  authentication
