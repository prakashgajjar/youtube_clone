import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.Token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Attach user info to request
    req.user = verified;
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    return res.status(403).json({ message: "Token is invalid or expired" });
  }
};

export default authUser;
