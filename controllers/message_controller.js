import Message from '../models/message.js';
const controller = {};

controller.sync = (req, res) => {
    Message.find({})
        .then(messages => res.status(200).send(messages))
        .catch(err => res.status(500).send(err));
};

controller.create = (req, res) => {
    const dbMessage = req.body;

    Message.create(dbMessage)
        .then( message => res.status(201).send(`new message created: \n ${message}`))
        .catch( err => res.status(500).send(err));

};

export default controller;