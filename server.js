import express from "express";
import mongoose from "mongoose";
import Messages from './dbMessages.js';
import bodyParser from 'body-parser';
import pusher from './config/pusher.js';

const app = express();
const port = process.env.PORT || 9000;

// connect to mongoDB Atlas, and create a "listener" that detects when insertions to the database
const connection_url = process.env.MONGODB_WHATSAPP_URI;
mongoose.connect(connection_url);
const db = mongoose.connection;
db.once('open', () => {
    console.log('Database connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();
    changeStream.on('change', (change) => {
        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message
            });
        } else {
            console.log('Error triggering Pusher');
        }
    })
})

// CORS Headers
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

// Allows Express to parse fields from the body of a request
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