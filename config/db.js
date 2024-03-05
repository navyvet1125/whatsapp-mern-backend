import mongoose from 'mongoose';
import pusher from './pusher.js';
const connection_url = process.env.MONGODB_WHATSAPP_URI;


// connect to mongoDB Atlas, and create a "listener" that detects when insertions to the database

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
                message: messageDetails.message,
                timeStamp: messageDetails.timeStamp,
                recieved: messageDetails.recieved
            });
        } else {
            console.log(change.operationType);
        }
    })
});

export default mongoose;