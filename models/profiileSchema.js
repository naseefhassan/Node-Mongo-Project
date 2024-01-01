const mongoose = require("mongoose")


const ProfileSchema = new mongoose.Schema({
    DOB:{type:Number,required:true},
    age:{type:Number, required:true},
    Gender:{type:String,required:true},
    PhoneNumber:{type:Number,required:true},

})

const profile=new mongoose.model("profile",ProfileSchema)

module.exports=profile