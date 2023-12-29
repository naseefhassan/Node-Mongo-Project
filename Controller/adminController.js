const productDetails=require("../models/ProductSchema")
const upload=require("../Middleware/multer")


let object = {
  admin: (req, res) => {
    
      res.render("admin/adminPage");
    
    
  },
  addproduct: (req, res) => {
    res.render("admin/addProduct");
  },
  postAddProduct: async (req, res) => {
    let productName = req.body.productName;
    let productDescription = req.body.productDescription;
    let productPrice = req.body.productPrice;
    let productImage = req.file ? 'product-images' + req.file.filename : '';

    if (!productPrice) {
        return res.status(400).send('Product Price is required.');
    }

    let product = new productDetails({
        productName: productName,
        productDescription: productDescription,
        productPrice: productPrice,
        productImage: productImage
    });

    try {
        await product.save();
        return res.redirect('/admin/showProduct');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
},

  // postAddProduct: async (req,res)=>{
    
  //   let productName=req.body.productName
  //   let  productDescription=req.body.productDescription
  //   let productPrice=req.body.productPrice
  //   let productImage=req.file ? 'product-images'+req.file.filename:''
  //   console.log(productName,productDescription,productPrice);
   
  //   let  product= new productDetails({
  //       productName:productName,
  //       productDescription:productDescription,
  //       productPrice:productPrice,
  //       productImage:productImage
  //   })
  //   console.log(product);
    
  //   try {
  //     await product.save();
  //     return res.redirect('/admin/showProduct');
  // } catch (error) {
  //     console.error(error);
  //     return res.status(500).send('Internal Server Error');
  // }
  

  // },
  showUser: (req, res) => {
    res.render("admin/showUser");
  },
  showProduct: (req, res) => {
    res.render("admin/showProduct");
  },
  editProduct: (req, res) => {
    res.render("admin/editProduct");
  },
};

module.exports = object;
