import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { generateToken }  from '../utils/token.js';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {


        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({ username, email, password: hashedPassword });
        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);
            res.status(201).json({ message: 'User registered successfully', user: savedUser });
        }else
        {
            res.status(400).json({ message: 'Failed to create user' }); 
        }

    } catch (error) {
        console.error('Error in signup controller:', error);
        res.status(500).json({ message: 'Server error' });
    };
}

    export const login = async (req, res) => {
        // Handle user login logic here
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }
            generateToken(user._id, res);
            res.json({ message: 'User logged in successfully', user });
        } catch (error) {

            console.error('Error in login controller:', error);
            res.status(500).json({ message: 'Server error' });
        }


    };   

    export const logout = (_, res) => {
         res.cookie("token", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    };

   
