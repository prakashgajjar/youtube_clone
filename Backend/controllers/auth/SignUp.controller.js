import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../models/User.models.js';
import cookieParser from 'cookie-parser';

const SignUp = async (req, res) => {
    const { username, password, email, profilePicture } = req.body;
    console.log(req.body);
    if (!username || !password || !email) {
       return res.status(400).json({ message: "Please fill all the fields" });
    }
    const checkEmail = await User.findOne({ email: email })
    if (checkEmail) {
      return  res.status(401).json({ message: "User already exists" });
    }
    const checkUsername = await User.findOne({ username: username})
    if (checkUsername) {
      return  res.status(401).json({ message: "Username already exists" });
    }
    try {
        bcrypt.genSalt(10, (err, salt)=> {
            if (err) throw err;
            bcrypt.hash(password, salt, async (err,hash)=> {
                if (err) throw err;
                const user = await User.create({
                    username,
                    password:hash,
                    email,
                    profilePicture
                })
                console.log(user)
                const LoginToken = jwt.sign({ id: user._id , email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
                res.cookie('LoginToken', LoginToken , { httpOnly: true , path: '/'});

                const AccessToken = jwt.sign({ id: user._id , email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(201).json({ AccessToken: AccessToken  , user});
            });
        });

    } catch (error) {
        console.error(error.message);
        res.status(501).send('Server Error');
    }

}
export default SignUp;