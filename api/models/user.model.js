import mongoose from "mongoose";

const userSchemma = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
       
    },avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fde%2Fsearch%3Fk%3Ddefault%2Bprofile%2Bpicture&psig=AOvVaw0yllPyaFrKSnDj7_lCPQy8&ust=1712785020896000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiIvs2LtoUDFQAAAAAdAAAAABAJ"
    },
},{timestamps:true})

const User  = mongoose.model("User",userSchemma);

export default User