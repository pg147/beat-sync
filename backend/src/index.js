// Dependencies
import express from "express";
import dotenv from "dotenv";

// Routes
import { userRoutes, authRoutes, adminRoutes, albumRoutes, songRoutes, statRoutes } from "./routes";

// .env config
dotenv.config({
    path: '.env.local'
});

const app = express();  // express app
const PORT = process.env.PORT;   // defined PORT

app.use('/api/v1/users', userRoutes); 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/songs', songRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/stats', statRoutes);

app.listen(PORT, () => {
    console.log(`Server started at : `, PORT);
})
