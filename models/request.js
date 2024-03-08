import mongoose from "mongoose";
import User from "./user.js";



const requestSchema = new mongoose.Schema;({
    members: {
        from: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        to: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
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

requestSchema.statics.findFriendsByID = function(id, cb ) {
    User.find({
        $and: [
            {request: 'accepted'},
            {$or: [{to:id}, {from:id}]}
        ]
    }, cb)

}

const Request = mongoose.model('Request', requestSchema);
export default Request;