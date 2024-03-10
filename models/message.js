import mongoose from "mongoose";
import User from "./user.js";
import Chat from "./chat.js";

const whatsAppSchema = mongoose.Schema({
    message: String,
    chat: {type: mongoose.Schema.Types.ObjectId, ref: 'Chat'},
    timeStamp: {type: Date, default: Date.now()},
    received: {type: Boolean, default: false}
});

export default mongoose.model('messageContent',whatsAppSchema);