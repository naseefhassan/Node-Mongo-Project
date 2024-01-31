const userDetails = require("../models/userschema");
const collection = require("../confiq/confiq");
const bcrypt = require("bcrypt");
const validation = require("../validation/validation");

let object = {
  getSignup: (req, res) => {
    if (req.session.token) {
      res.redirect("user/userPage");
    } else {
      res.render("signup");
    }
  },

  getLogin: (req, res) => {
    if (req.session.token) {
      res.redirect("user/userpage");
    } else {
      res.render("login");
    }
  },
  getUser: (req, res) => {
    res.render("user");
  },
  postSignup: async (req, res) => {
    validation(req, res, async () => {
      const { name, email, password } = req.body;

      const existinguser = await userDetails.findOne({ email: email });
      if (existinguser) {
        return res.send("you have already a account,Please login");
      } else {
        const saltRounds = 10;
        const hashpassword = await bcrypt.hash(password, saltRounds);

        const data = {
          name: name,
          email: email,
          password: hashpassword,
        };
        const userdata = await userDetails.insertMany([data]);
        const userIDfind = await userDetails.findOne({ email: email });
        const userId = userIDfind._id;
        req.session.token = userId;
        res.redirect("user/userPage");
      }
    });
  },
  // loin user
  postLogin: async (req, res) => {
    try {
      const check = await userDetails.findOne({ email: req.body.username });
      if (!check) {
        return res.send("you don't have account please singup");
      }
      const passwordmatch = await bcrypt.compare(
        req.body.password,
        check.password
      );
      if (!passwordmatch) {
        res.send("wrong password");
      } else {
        req.session.token = check._id;

        if (check.role === "admin") {
          req.session.IsAdmin = true;
          res.redirect("/admin/home");
        } else {
          req.session.token = check._id;
          res.redirect("user/userPage");
        }
      }
    } catch {
      res.send("wrong details");
    }
  },
};

module.exports = object;
