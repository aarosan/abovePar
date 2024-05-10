const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const newUser = new User({ firstName, lastName, email, password });
        await newUser.save();

        return res.status(201).json({ message: 'User created succesffully', user: newUser });
    } catch (error) {
        console.error('Erorr during sign-up:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};