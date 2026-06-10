import User from "../../models/User.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(401).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });
    const Token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("Token", Token, { httpOnly: true, path: "/" });
    res.status(201).json({ message: "Logged in successfully", user: { user } });
  } catch (error) {
    console.error(error.message);
    res.status(501).send("Server Error");
  }
};

export default signIn;
