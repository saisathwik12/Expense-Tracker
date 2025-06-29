import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        require : true
    }
})

export const User = mongoose.model("User",userSchema);
