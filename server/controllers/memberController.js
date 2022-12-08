const { Member, User } = require("../models/index");

class MemberController {
  static async getAllMembers(req, res, next) {
    try {
      const fetch = await Member.findAll();
      res.status(200).json(fetch);
    } catch (error) {
      next(error);
    }
  }

  static async memberProfile(req, res, next) {
    try {
      const { nickName } = req.params;
      const profile = await Member.findOne({ where: { nickName } });
      if (!profile) {
        throw { name: "DATA NOT FOUND" };
      }

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MemberController;
