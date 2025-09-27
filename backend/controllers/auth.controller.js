const User = require("../models/user.models");

// register a new user
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // create new user
        const user = new User({ name, email, password });
        await user.save();

        // Generate auth token
        const token = await user.generateAuthToken();
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// login a user
exports.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: { id: user._id, name: user.name, email: user.email },
                token
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// logout a user
exports.logout = async (req, res) => {
    try {
        const user = req.user;
        user.tokens = user.tokens.filter(token => token.token !== req.token);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};