import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const registerUser = async (req, res) => {
    try {
        // Destructure user data from request body
        const { name, email, password, userType} = req.body;

        // Checking if none fields is empty

        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        // Check for existing user with email
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).send('User already exists');
        }


        const userMake = await User.create({ name, email, password, userType});
        const createdUser = await User.findById(userMake._id).select("-password")

        if (!createdUser) {
            return res.status(400).send('User not registered');
        }

        res.status(200).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Registratiion failed');
    }
}

const loginUser = async (req, res) => {
    try {
        // Destructure user data from request body
        const { email, password } = req.body;

        // Checking if none fields is empty

        if (!email || !password) {
            return res.status(400).send('All fields are required');
        }

        // Check for existing user with email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('User does not exist');
        }

        if (user.password !== password) {
            return res.status(400).send('Invalid password');
        }

        const tokken = jwt.sign({ email, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            status: 'ok',
            tokken,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Login failed');
    }
}

const getUser = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send('Access denied. Token is missing.');
        }

        // Extract the token string (remove "Bearer " prefix)
        const tokenString = token.split(' ')[1];

        try {
            const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);

            const email = decoded.email;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).send('User not found');
            }

            res.status(200).json(user);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).send('Access denied. Token expired.');
            } else {
                console.error(error);
                return res.status(401).send('Access denied. Invalid token.');
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
    
export { registerUser, loginUser, getUser };