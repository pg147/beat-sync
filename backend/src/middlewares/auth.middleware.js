import { clerkClient } from "@clerk/express";

const protectRoute = async (req, res, next) => {
    if (!req.auth.userId) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized access! Login first."
        });
    }

    next();
}

const requireAdmin = async (req, res, next) => {
    try {
        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized Access - only Admins allowed"
            });
        }

        next();
    } catch (error) {
        console.error("Error fetching: ", error.message);
        res.status(500).json("Internal Server error!");
    }
}

export { protectRoute, requireAdmin };