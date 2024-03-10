import mongoose from "mongoose";
import User from "./user.js"

const chatSchema = mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    nickname: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
    isTyping: [{type: Boolean, default: false}],
    active: Boolean,
    lastUpdated: Date,
    createdAt: {type: Date, default: Date.now()}
})

chatSchema.methods.changeTypingStatus = async function (member_id) {
   const index = this.members.indexOf(member_id);
   const isTyping = this.isTyping[index];
   this.isTyping[index] = !isTyping;
   this.save();  
}
  // Create the model class
const Chat = mongoose.model('chat', chatSchema);

// Export the model
export default Chat;