import User from '../models/user.js';
const controller = {};

controller.read = async (req, res) => {
    try{
        const username = req.params.username
        const user =  await User.findOne({username}).select('name username friends avatar status joined');
        res.status(200).send({user});

    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
};
controller.index = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);   
    }

};

export default controller;