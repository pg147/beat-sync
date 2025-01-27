import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URI}`);

        if (connect) {
            console.log("Database connected with host : ", connect.connection.host);
        }
    } catch (error) {
        console.error(`Error connecting to the database ${error.message}`);
    }
}

export default connectDB;