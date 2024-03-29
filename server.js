import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import db from './config/db.js';
import indexRouter from './routes/index.js';
import messagesRouter from './routes/messages.js';
import usersRouter from './routes/users.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 9000;
app.use(cors());

// Allows Express to parse fields from the body of a request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes from routes folder
app.use('/', indexRouter);
app.use('/messages', messagesRouter);
app.use('/users', usersRouter);

// app.listen(port, () => console.log(`Listening on localhost:${port}.`));
process.on('SIGINT', () => {
    db.connection.close();
    console.log('Database disconnected!')
    process.exit(0);
});
export default app;