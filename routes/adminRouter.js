const express=require("express")
const  router=express.Router()
const{admin,addproduct,postAddProduct,showUser,showProduct,editProduct}=require("../Controller/adminController")


router.get("/home",admin)
router.get("/addProduct",addproduct)
router.post("/addproduct",postAddProduct)
router.get("/showUser",showUser)
router.get("/showProduct",showProduct)
router.get("/editProduct",editProduct)

module.exports=router