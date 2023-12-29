const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
const nocache = require("nocache");
const session = require("express-session");
const bodyPraser = require("body-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(nocache());
app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const adminRoutes=require("./routes/adminRouter")
const userRoutes=require("./routes/userRouter")
const commonRoutes = require("./routes/commonRouter");

app.use("/admin",adminRoutes)
app.use("/", commonRoutes);
app.use("/user",userRoutes)

app.listen(port, () => console.log("serveer started"));
