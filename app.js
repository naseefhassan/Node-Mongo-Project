const express = require("express");
const app = express();
const path = require("path");
const port = 4000;
const nocache = require("nocache");
const session = require("express-session");
// const bodyParser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(nocache());
require('dotenv').config()
app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/public",express.static("public"))
app.use('/product-images,',express.static("public/product-images"))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const adminRoutes=require("./routes/adminRouter")
const userRoutes=require("./routes/userRouter")
const commonRoutes = require("./routes/commonRouter");

app.use("/admin",adminRoutes)
app.use("/", commonRoutes);
app.use("/user",userRoutes)

app.listen(port, () => console.log("serveer started"));
