const userDetails = require("../models/userschema");
const collection = require("../confiq/confiq");
const bcrypt = require("bcrypt");
const validation = require("../validation/validation");

let object = {
  getSignup: (req, res) => {
    res.render("signup");
  },

  getLogin: (req, res) => {
    res.render("login");
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
        console.log(userdata);
        res.redirect("/user");
      }
    });
  },
  // loin user
  postLogin: async (req, res) => {
    try {
      console.log(req.body);
      const check = await userDetails.findOne({ email: req.body.username });
      console.log(check);
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
        if(check.role==="admin"){
          console.log("sd");
          res.redirect("/admin/home")
        }else if(check.role==="user"){
          res.redirect("user/userPage")
        }
      }
    } catch {
      res.send("wrong details");
    }
  },
};

module.exports = object;
