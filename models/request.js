import mongoose from "mongoose";
import User from "./user.js";



const requestSchema = new mongoose.Schema({
    members: {
        type:[ {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}],
        validate: [sizeLimit, '{PATH} requires 2 unique memebers']
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
            {members:{"$in": [id]} }
        ]
    }, cb);



}

async function sizeLimit (val) {
    // Checks for invalid member list.
    // Members contain two unique users that do not already have an existing relationship.
    const isDup = await Request.find({members: val});
    const isValid = val.length === 2 && val[0] !== val[1] && isDup.length === 0;
    console.log(isValid);
    return isValid;
  }
const Request = mongoose.model('Request', requestSchema);
export default Request;