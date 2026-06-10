import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserSign = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (!email || !password || (isSignUp && !username)) {
        toast.error("Please fill all fields!");
        return;
      }

      console.log(email, password, username);

      const url = isSignUp
        ? "http://localhost:3000/api/signup"
        : "http://localhost:3000/api/signin";

      const payload = isSignUp
        ? { username, email, password }
        : { email, password };

      const response = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(response)

      if (response.status === 201) {
        toast.success(
          isSignUp ? "Account created successfully!" : "Logged in successfully!"
        );
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4">
      <ToastContainer theme="dark" position="top-center" autoClose={2000} />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-8"
      >
        <motion.h2
          key={isSignUp ? "signup" : "signin"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center text-white"
        >
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </motion.h2>

        <p className="text-gray-400 text-center mt-2">
          {isSignUp
            ? "Sign up to get started with your journey"
            : "Sign in to continue exploring"}
        </p>

        <div className="mt-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2 border border-gray-700 focus-within:border-red-500">
                <User className="text-gray-500" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="bg-transparent w-full outline-none text-gray-200"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2 border border-gray-700 focus-within:border-red-500">
              <Mail className="text-gray-500" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent w-full outline-none text-gray-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <div className="flex items-center gap-2 bg-gray-900 rounded-xl px-3 py-2 border border-gray-700 focus-within:border-red-500">
              <Lock className="text-gray-500" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-transparent w-full outline-none text-gray-200"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-white font-semibold hover:from-red-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-red-600/20"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            {isSignUp ? "Already have an account?" : "New here?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-red-400 hover:text-red-500 font-semibold transition"
            >
              {isSignUp ? "Sign In" : "Create one"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSign;
