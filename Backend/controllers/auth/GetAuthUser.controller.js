import User from "../../models/User.models.js";

const GetAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // never send password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("GetAuthUser Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default GetAuthUser;
