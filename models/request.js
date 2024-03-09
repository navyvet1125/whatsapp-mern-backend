import mongoose from "mongoose";
import User from "./user.js";



const requestSchema = new mongoose.Schema({
    members: {
        type:[ {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
        validate: [sizeLimit, '{PATH} requires 2 memebers']
    },
      request: {type: 'String', enum: [
	    'pending',
	    'accepted',
        'rejected', 
	    'hidden',
        'blocked' 
	], default:'pending'},
    blockedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now()},
    updated: Date
});

requestSchema.statics.findFriendsByID = async function(id, cb ) {
    const requests =  await this.find({
        $and: [
            {request: 'accepted'},
            {$or: [{members: {to:id}}, {members: {from:id}}]}
        ]
    }).select('members');



}

requestSchema.pre('validate', function (){
    this.members.sort();
})

function sizeLimit(val) {
    return val.length === 2;
  }
const Request = mongoose.model('Request', requestSchema);
export default Request;