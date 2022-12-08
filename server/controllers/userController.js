const { User, Oshi, Member } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const verify = require("../helpers/google");
const sendEmail = require('../helpers/nodemailer')
const midtransClient = require('midtrans-client');


class UserController {
  static async register(req, res, next) {
    try {
      const profilePict = req.file.path
      const { username, email, password } = req.body;
      const create = await User.create({
        username,
        email,
        password,
        profilePicture: profilePict
      });
      sendEmail(email)
        res.status(201).json({
          message: `user with email ${create.email} has been created`,
        });
      
    } catch (error) {
      //next(error)
     next(error)
      
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let { google_token } = req.headers;
      let email = await verify(google_token);
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          email,
          username: `${email.split("@")[0]}`,
          password: "google",
          imageUrl:
            "https://t4.ftcdn.net/jpg/03/46/93/61/360_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg",
          status: "fans",
        },
        hooks: false,
      });

      let payload = { id: user.id };

      const access_token = createToken(payload);
      res.status(200).json({ access_token, email: user.email });
    } catch (error) {
     next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "bad_request" };
      }

      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        throw { name: "invalid_credentials" };
      }

      const compare = comparePassword(password, foundUser.password);

      if (!compare) {
        throw { name: "invalid_credentials" };
      }

      let payload = { id: foundUser.id };
      const access_token = createToken(payload);

      res
        .status(200)
        .json({ access_token, email: foundUser.email, username: foundUser.username });
    } catch (error) {
      console.log(error)
    }
  }

  static async userProfile(req, res, next) {
    try {
      const profile = await User.findOne(({
        include: [
          {model: Oshi, include: Member}
        ],
        where: { username: req.user.username },
      }))
      res.status(200).json(profile)
    } catch (error) {
      console.log(error)
    }
  }

  static async addOneOshi(req, res, next) {
    try {
      const {MemberId} = req.params
      const UserId = req.user.id

      const oshi = await Oshi.create({
        MemberId, UserId
      })
      res.status(200).json({
        UserId: oshi.UserId,
        MemberId: oshi.MemberId
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async getOshi(req, res, next) {
    try {
      const wota = await User.findOne(({
        include: [
          {model: Oshi, include: Member}
        ],
        where: { username: req.user.username },
      }))
      res.status(200).json(wota)
    } catch (error) {
     next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { username } = req.user;

      const update = await User.update({ status: 'Official' }, { where: { username } });
      if (!update) {
        throw { name: "DATA NOT FOUND" };
      }
      res.status(200).json({message: 'status updated'})
    } catch (error) {
     next(error)
    }
  }

  static async midtransToken(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id)
      if (user.status == 'Official') {
        throw { name: 'alreadyPaid' }
      }
  
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: 'SB-Mid-server-3h7VAxytKFkU0mEStRaUXWoK'
      });
  
      let parameter = {
        transaction_details: {
          order_id: "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: 100000
        },
        credit_card: {
          "secure": true
        },
        customer_details: {
          email: user.email,
        }
      };
  
      const midtransToken = await snap.createTransaction(parameter)
      res.status(200).json(midtransToken);
      
  
    } catch (error) {
      next(error)
    
    }
  }
}

module.exports = UserController;
