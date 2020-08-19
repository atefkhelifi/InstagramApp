const mongoose=require('mongoose')
const {ObjectId}= mongoose.Schema.Types



const userSchema =new mongoose.Schema({
    name:{
       type:String,
       required:true 
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/docezoegk/image/upload/v1597583459/t%C3%A9l%C3%A9chargement_lkk4vx.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
})

mongoose.model("User",userSchema)