const express = require("express");
const Router = express.Router();
const { getSignup, getLogin,getUser, postSignup, postLogin } = require("../Controller/commonController");

Router.get("/", getSignup);
Router.get("/login", getLogin);
Router.get("/user",getUser)
Router.post("/signupAction",postSignup)
Router.post("/loginAction",postLogin)

module.exports=Router


