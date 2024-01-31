const productDetails = require("../models/ProductSchema");
const userDetails = require("../models/userschema");

let object = {
  
  admin: (req, res) => {
    if (req.session.IsAdmin) {
      res.render("admin/adminPage");
    } else {
      res.redirect("/login");
    }
  },

  addproduct: (req, res) => {
    res.render("admin/addProduct");
  },

  postAddProduct: async (req, res) => {
    if (req.session.IsAdmin) {
      let productName = req.body.productName;
      let productDescription = req.body.productDescription;
      let productPrice = req.body.productPrice;
      let productImage = req.file
        ? `/product-images/${req.file.filename}`
        : "/default-image.jpg";

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
    } else {
      res.redirect("/login");
    }
  },

  showUser: async (req, res) => {
    if (req.session.IsAdmin) {
      const users = await userDetails.find();

      res.render("admin/showUser", { users });
    } else {
      res.redirect("/login");
    }
  },

  showProduct: async (req, res) => {
    if (req.session.IsAdmin) {
      try {
        const products = await productDetails.find();
        res.render("admin/showProduct", { products });
      } catch (error) {
        return res.status(500).send("internal server error ");
      }
    } else {
      res.redirect("/login");
    }
  },

  editProduct: async (req, res) => {
    if (req.session.IsAdmin) {
      try {
        const productId = req.params.id;
        const product = await productDetails.findById(productId);

        res.render("admin/editProduct", { product });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.redirect("/login");
    }
  },

  posteditProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      let { productName, productDescription, productPrice, productImage } =
        req.body;
      let product = await productDetails.findById(productId);

      product.productName = productName;
      product.productDescription = productDescription;
      product.productPrice = productPrice;
      product.productImage = productImage;

      await product.save();

      res.redirect("/admin/showProduct");
    } catch (error) {
      console.log(error);
    }
  },

  deleteProduct: async (req, res) => {
    const productId = req.params.productId;

    await productDetails.findByIdAndDelete(productId);
    res.redirect("/admin/showProduct");
  },
};

module.exports = object;
