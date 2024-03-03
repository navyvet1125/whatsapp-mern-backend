import express from "express";
import mongoose from "mongoose";

const app = express();
const port = process.env.PORT || 9000;
const connection_url = process.env.MONGODB_WHATSAPP_URI;

mongoose.connect(connection_url);


app.get('/', (req, res) => res.status(200).send('Hello, world!'));

app.listen(port, () => console.log(`Listening on localhost:${port}.`));