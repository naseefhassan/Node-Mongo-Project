const productDetails = require("../models/ProductSchema");
const userDetails = require("../models/userschema");

let object = {
  userPage: async (req, res) => {
        // console.log(userId);
      try{
        const products = await productDetails.find()
        res.render("user/userhome",{products});
      } catch(error){
         return res.status(500).send("internal server error ")
      }
  
 
  },
  logout:(req,res)=>{
    req.session.destroy((err)=>{
      if(err){
        console.log("session destoyed");
      } else{
        res.redirect("/login")
        console.log("session ended");
      }
    })
  },
  profile:async(req,res)=>{
    const userId=req.params.id
    const user =await userDetails.findOne(userId)
    res.render("user/profileUpdate",{user})
     
  }
};

module.exports = object;
