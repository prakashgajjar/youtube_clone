import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';
const authUser =  async (req,res , next)=>{
    const LoginToken =   req.cookies.LoginToken;
    try {
        if(LoginToken){
            const verified = jwt.verify(LoginToken, process.env.JWT_REFRESH_SECRET);
            req.user = verified;
            console.log("User authenticated");
            next();
        }
    } catch (error) {
        console.error(error.message);
        res.status(501).send('Server Error');
    }
}

export default authUser;