import mongoose from 'mongoose';
import User from './models/user.js';
import Request from './models/request.js';

const connection_url = process.env.MONGODB_WHATSAPP_URI;

mongoose.connect(connection_url);

await User.deleteMany({name: {$exists: true}});
await Request.deleteMany({_id: {$exists: true}})
console.log('Database connected: ');
try {
    const users = await User.create([
        { name:'Evan Washington', email:'enavy04@gmail.com', username:'navyvet1125', password:'Pinpineappleapplepin123*'},
        { name:'Wanda Washington', email:'wwashi3@aol.com', username:'wwashi3', password:'Imnotallalong323_'},
        { name:'Dwight Washington', email:'daw54@aol.com', username:'daw54', password:'whodadaddy313!'}
    ]);

    // console.log(users[0].id);
    // await User.addRequest(users[0].id, users[1].id);
    await users[0].addRequest(users[1]);
    // const requests = await  Request.create([
    //     {members: [users[0], users[1]]},
    //     {members: [users[0], users[2]], request: 'accepted'},
    //     {members: [users[2], users[1]]}
    // ])
    // console.log(requests);
    console.log('Database seeded...');
} catch (err) {
    console.log(err);
} finally {
    process.exit();
}