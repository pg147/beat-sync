// Dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

// Routes
import { userRoutes, authRoutes, adminRoutes, albumRoutes, songRoutes, statRoutes } from "./routes/index.js";

// DB Connection
import connectDB from "./db/db.js";

// .env config
dotenv.config({
    path: '.env.local'
});

const app = express();  // express app
const PORT = process.env.PORT;   // defined PORT

// Middleware for parsing request body into json format
app.use(express.json());

// Middleware for cors
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN,
    credentials: true
}))

// Middleware for using Clerk
app.use(clerkMiddleware());  // this embeds auth property to req object (req.auth.*(methods))

app.use('/api/v1', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/songs', songRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/stats', statRoutes);

// Middleware for Error handler
app.use((err, _, res, __) => {
    return res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal server error.' : err.message
    });
})

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started at : `, PORT);
        })
    })
    .catch((error) => console.error(error.message));
