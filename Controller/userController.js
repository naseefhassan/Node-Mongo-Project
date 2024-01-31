const productDetails = require("../models/ProductSchema");
const userDetails = require("../models/userschema");
const profile = require("../models/profiileSchema");
const { default: mongoose } = require("mongoose");

const object = {
  userPage: async (req, res) => {
    if (req.session.token) {
      try {
        const products = await productDetails.find({});
        res.render("user/userhome", { products });
      } catch (error) {
        return res.status(500).send("Internal server error");
      }
    } else {
      res.redirect("/login");
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log("Session destroyed");
      } else {
        res.redirect("/login");
        console.log("Session ended");
      }
    });
  },

  userInfo: async (req, res) => {
    try {
      if (req.session.token) {
        const data = await userDetails.findOne({ _id: req.session.token });

        if (data) {
          // Fetch profile details here and pass them to the render method
          const profile = await userDetails.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(data._id) } },
            {
              $lookup: {
                from: "profiles",
                localField: "_id",
                foreignField: "UserId",
                as: "profileDetails",
              },
            },
          ]);
          res.render("user/userInfo", { data, profile });
        } else {
          res.status(404).send("User not found");
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      res.status(500).send("Internal server error");
    }
  },

  profile: async (req, res) => {
    try {
      if (req.session.token) {
        const userId = req.session.token;
        const user = await userDetails.findOne({ _id: userId });

        // Ensure that user is found before proceeding
        if (user) {
          const profile = await userDetails.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(user._id) } },
            {
              $lookup: {
                from: "profiles",
                localField: "_id",
                foreignField: "UserId",
                as: "profileDetails",
              },
            },
          ]);

          res.render("user/profileUpdate", { user, Profile: profile });
        } else {
          res.status(404).send("User not found");
        }
      } else {
        res.redirect("/login");
      }
    } catch (error) {
      console.error("Error in profile route:", error);
      res.status(500).send("Internal server error");
    }
  },

  postProfile: async (req, res) => {
    try {
      const { name, email, DOB, age, Gender, PhoneNumber } = req.body;

      await userDetails.updateOne(
        { _id: req.session.token },
        { $set: { name, email } }
      );

      const UserId = req.session.token;

      await profile.updateOne(
        { UserId },
        { $set: { UserId, DOB, age, Gender, PhoneNumber } },
        { upsert: true }
      );

      const data = { name, email };
      res.redirect("/user/userInfo");
    } catch (error) {
      console.error("Error in postProfile route:", error);
      res.status(500).send("Internal server error");
    }
  },
};

module.exports = object;
