const express=require("express")
const  router=express.Router()
const{admin,addproduct,postAddProduct,showUser,showProduct,editProduct,posteditProduct,deleteProduct}=require("../Controller/adminController")
const multer=require("../Middleware/multer")

router.get("/home",admin)
router.get("/addProduct",addproduct)
router.post("/addproduct",multer.single("productImage"),postAddProduct)

router.get("/showUser",showUser)
router.get("/showProduct",showProduct )

router.get("/editProduct/:id",editProduct)
router.post("/posteditProduct/:id",multer.single('productImage'),posteditProduct)

router.post("/deleteProduct/:productId",deleteProduct)
module.exports=router