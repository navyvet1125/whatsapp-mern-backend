import mongoose from "mongoose";
import User from "./user.js";

const whatsAppSchema = mongoose.Schema({
    message: String,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    timeStamp: {type: Date, default: Date.now()},
    received: {type: Boolean, default: false},
    isTyping: {type: Boolean, default: false}
});

export default mongoose.model('messageContent',whatsAppSchema);