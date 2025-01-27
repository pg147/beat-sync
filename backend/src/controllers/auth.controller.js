import { User } from "../models/user.model.js";

const signup = async(req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body;

        // Check if user already exists
        const alreadyUser = await User.findOne({ clerkId: id });

        // If exists then return
        if (alreadyUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists."
            });
        }

        // If user doesn't exist create one
        const user = await User.create({
            clerkId: id,
            fullName: `${firstName} ${lastName}`,
            imageURL: imageUrl
        });
        
        // If user creation fails
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User creation failed."
            });
        }

        // If user created successfully
        return res.status(201).json({
            success: true,
            message: "Successfully created user!"
        });
    } catch (error) {
        console.error("Error signing up: ", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export { signup };