import { User } from "../models/user.model.js";

const getAllUsers = async (req, res, next) => {
    const currentUserId = req.auth.userId;

    try {
        const users = await User.find({
            clerkId: { $ne: currentUserId }
        });

        // If no users found
        if (!users) return res.status(404).json({
            success: false,
            message: "No users found!"
        });

        // If users found
        return res.status(200).json({
            success: true,
            users
        });

    } catch (error) {
        console.error(error);
        next(error);
    }
}

export { getAllUsers };