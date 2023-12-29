const express=require("express")
const  router=express.Router()
const{userPage}=require("../Controller/userController")


router.get("/userPage",userPage)








module.exports=router