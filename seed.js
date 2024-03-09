import mongoose from 'mongoose';
import User from './models/user.js';

const connection_url = process.env.MONGODB_WHATSAPP_URI;

mongoose.connect(connection_url);

await User.deleteMany({name: {$exists: true}});
console.log('Database connected: ');
try {
    const users = await User.create([
        { name:'Evan Washington', email:'enavy04@gmail.com', username:'navyvet1125', password:'Pinpineappleapplepin123*'},
        { name:'Wanda Washington', email:'wwashi3@aol.com', username:'wwashi3', password:'Imnotallalong323_'},
        { name:'Dwight Washington', email:'daw54@aol.com', username:'daw54', password:'whodadaddy313!'}
    ]);
    console.log('Database seeded...');
} catch (err) {
    console.log(err);
} finally {
    process.exit();
}