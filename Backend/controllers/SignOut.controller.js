import express from "express";
import cookieParser from "cookie-parser";

const SignOut = async (req, res) => {
    try {
        res.clearCookie("refreshToken" , {httpOnly : true , path: '/'});
        console.log("logout")
        res.json({message: "Logged out successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(501).send('Server Error');
    }
}
export default SignOut;