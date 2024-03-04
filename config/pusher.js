import Pusher from 'pusher';

const pusher = new Pusher({
    appId: process.env.PUSHER_WHATSAPP_MERN_APPID,
    key: process.env.PUSHER_WHATSAPP_MERN_KEY,
    secret: process.env.PUSHER_WHATSAPP_MERN_SECRET,
    cluster: process.env.PUSHER_WHATSAPP_MERN_CLUSTER,
    useTLS: true
  });

export default pusher;