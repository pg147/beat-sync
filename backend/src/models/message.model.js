import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: String,  // Clerk ID
        required: true
    },
    receiverId: {
        type: String,  // Clerk ID
        required: true
    },
    content: {
        type: String,
    },
}, { timestamps: true });

export const Message = mongoose.model("Message", messageSchema);