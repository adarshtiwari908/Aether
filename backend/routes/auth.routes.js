const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");
const User = require("../models/user.models");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

// Protected route (requires login)
router.get("/profile", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: {
            user: { id: req.user._id, name: req.user.name, email: req.user.email }
        }
    });
});

// Admin-only route (requires admin role)
router.get("/admin/users", auth, authorizeRoles("admin"), async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
});

module.exports = router;
