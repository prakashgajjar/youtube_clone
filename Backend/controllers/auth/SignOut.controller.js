import express from "express";
import cookieParser from "cookie-parser";

const SignOut = async (req, res) => {
    try {
        res.clearCookie("Token", {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', // optional, for HTTPS environments
            sameSite: 'strict',
            path: '/',
        });

        console.log("User logged out successfully");

        return res.status(201).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error.message);
        return res.status(500).json({ message: "Server Error" });
    }
};

export default SignOut;
