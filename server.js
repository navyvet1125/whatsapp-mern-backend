import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 9000;
const connection_url = process.env.MONGODB_WHATSAPP_URI;

mongoose.connect(connection_url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send('Hello, world!'));

app.get('/messages/sync', (req, res) => {
    Messages.find({})
        .then(messages => res.status(200).send(messages))
        .catch(err => res.status(500).send(err));
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Messages.create(dbMessage)
        .then( message => res.status(201).send(`new message created: \n ${message}`))
        .catch( err => res.status(500).send(err));

})

app.listen(port, () => console.log(`Listening on localhost:${port}.`));