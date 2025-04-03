import React, { useState } from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import { useAppContext } from "../../Hooks/AppContext";
import { useNavigate } from "react-router-dom";
const UserSign = () => {

  const {auth  , setAuth , setUserDetail , userDetail} = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (isSignUp) {
      const responce = await axios.post('http://localhost:3000/api/signup',
        { username, password, email },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      if (responce.status === 201) {
        console.log('User created successfully');
        setTimeout(() => {
          navigate('/');
        }, 200);
        setTimeout(()=>{
          window.location.reload();
        },[201])
      }else{
        console.error('Error', responce.message);
      }
    } else {
      const responce = await axios.post('http://localhost:3000/api/signin',
        { password, email },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      if (responce.status === 201) {
        console.log('User login successfully');
        console.log(responce)
        setTimeout(() => {
          navigate('/');
        }, 200);
        setTimeout(()=>{
          window.location.reload();
        },[201])
      }else{
        console.error('Error', responce.message);
      }
    }
  }

  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex items-center justify-center w-screen  rounded-xl min-h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">
        <h2 className="text-3xl font-semibold text-white text-center">
          {isSignUp ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-gray-300 text-center mt-2">
          {isSignUp ? "Sign up to get started" : "Sign in to continue"}
        </p>

        {isSignUp && (
          <div className="mt-6">
            <label className="text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
              className="w-full mt-2 p-3 border border-gray-500 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="text-gray-300">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-500 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-300">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-2 p-3 border border-gray-500 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          onClick={() => {
            handleSubmit();
            setEmail('');
            setPassword('');
            setUsername('');
          }}
          type="submit"
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition duration-300"
        >
          {isSignUp ? "Sign Up" : "Sign In"}

        </button>


        <div className="mt-6 flex flex-col items-center">
          <p className="text-gray-400 mt-3">
            {isSignUp ? "Already have an account?" : "New here?"}
          </p>
          <button
            className="text-red-400 hover:text-red-500 font-semibold"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign in" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSign;
