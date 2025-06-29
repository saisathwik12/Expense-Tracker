import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req,res) =>{
    try{
        const {fullname, email, password} = req.body;
        if(!fullname || !email || !password) return res.status(400).json({message : "All fields are required", success : false});

        const user = await User.findOne({email})
        if (user) return res.status(400).json({message : "user already exits with this email.", success : false});
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            password : hashedPassword,
        });
        return res.status(201).json({message : "Account Created Successfully", success : true});

    }
    catch(err){
        console.log(err)
    }
}

export const login = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({message : "All fields are required", success : false});
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "Incorrect Email and Password ", success : false});
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword) return  res.status(400).json({message : "Incorrect Email and Password ", success : false});
        const tokenData = {
            userId : user._id
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY);
        return res.status(201).cookie("token",token,{maxAge : 1 * 24 * 60 * 60 * 1000, httpOnly : true, sameSite : "None" }).json({
            message : `Welcome ${user.fullname}`,
            user : {
                userId : user._id,
                fullname : user.fullname,
                email : user.email
            },
            success : true,
        })
        
    }
    catch(err){
        console.log(err)
    }
}

export const logout = async(req,res) =>{
    try{
        return res.status(201).json({message : 'User logged out successfully', success : true})
    }
    catch(err){
        console.log(err)
    }
}