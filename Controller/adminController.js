const productDetails = require("../models/ProductSchema");
const userDetails = require("../models/userschema");

let object = {
  admin: (req, res) => {
    res.render("admin/adminPage");
  },

  addproduct: (req, res) => {
    res.render("admin/addProduct");
  },

  postAddProduct: async (req, res) => {
    console.log(req.body);
    let productName = req.body.productName;
    let productDescription = req.body.productDescription;
    let productPrice = req.body.productPrice;
    let productImage = req.file ? `/product-images/${req.file.filename}`:"/default-image.jpg";
    console.log(productName, productDescription, productPrice);


    let product = new productDetails({
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      productImage: productImage,
    });

    try {
      await product.save();
      return res.redirect("/admin/showProduct");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  },

  showUser:async (req, res) => {
    const users =await userDetails.find()

    res.render("admin/showUser",{users});
  },

  showProduct: async (req, res) => {
    try{
      const products = await productDetails.find()
      res.render("admin/showProduct",{products});
    } catch(error){
       return res.status(500).send("internal server error ")
    }
  },

  editProduct:async (req, res) => {
    
      const productId=req.params.id;
      const product =await productDetails.findById(productId)
      
      res.render("admin/editProduct",{product});
      
    },
    
    posteditProduct:async(req,res)=>{
    console.log("ethi");
    console.log(req.body);

    const productId= req.params.id
    let {productName,productDescription,productPrice,productImage}=req.body
    let product= await productDetails.findById(productId)

    console.log(product);

    product.productName=productName
    product.productDescription=productDescription
    product.productPrice=productPrice
    product.productImage=productImage

    console.log(productName);
     await product.save().then(()=>{
      console.log("data updated");
     })

    res.redirect("/admin/editProduct/:id")


  },

  deleteProduct:async(req,res)=>{
    const productId = req.params.productId
    
    await productDetails.findByIdAndDelete(productId)
    res.redirect("/admin/showProduct")

  }
};

module.exports = object;
