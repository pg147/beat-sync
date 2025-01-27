import express from "express";
import dotenv from "dotenv";

dotenv.config({
    path: '.env.local'
});

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server started at : `, PORT);
})
