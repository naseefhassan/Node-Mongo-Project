const express=require("express")
const  router=express.Router()
const{userPage,logout,profile,postProfile,userInfo}=require("../Controller/userController")


router.get("/userPage",userPage)
router.get("/logout",logout)
router.get("/profile",profile)
router.post("/postProfile",postProfile)
router.get("/userInfo",userInfo)



module.exports=router