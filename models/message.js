import mongoose from "mongoose";
import User from "./user.js";

const whatsAppSchema = mongoose.Schema({
    message: String,
    name: String,
    timeStamp: {type: Date, default: Date.now()},
    received: {type: Boolean, default: false}
});

export default mongoose.model('messageContent',whatsAppSchema);