import jwt from "jsonwebtoken";

const isAuthenticate = async(req,res,next) =>{
    try{
        const token = req.cookies.token;
        if(!token) return res.status(400).json({message : "User not Authenticated", success : false});
        const verifyToken = await jwt.verify(token,process.env.SECRET_KEY);
        if(!verifyToken) return res.status(400).json({message : "Invalid Token", success : false});
        req.id = verifyToken.userId;
        next();
    }
    catch(error){
        console.log(error)
    }
}
export default isAuthenticate;