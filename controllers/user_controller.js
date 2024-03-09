import User from '../models/user.js';
import Request from '../models/request.js';
const controller = {};

controller.read = async (req, res) => {
    try{
        const username = req.body.username
        const user =  await User.findOne({username});
        res.status(200).send(user);
        username.friends = await Request.findFriendsByID(username.id)
    } catch (err) {
        res.status(500).send(err)
    }
};