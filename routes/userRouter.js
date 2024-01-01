const express=require("express")
const  router=express.Router()
const{userPage,logout,profile}=require("../Controller/userController")


router.get("/userPage",userPage)
router.get("/logout",logout)
router.get("/profile",profile)








module.exports=router