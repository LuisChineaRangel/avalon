import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoose_url = process.env.MONGODB_URL || 'mongodb://localhost:27017/express-mongo';

console.log('Connecting to MongoDB server...');

connect(mongoose_url).then(() => {
    console.log('Connection to MongoDB server established');
}).catch(() => {
    console.log('Unnable to connect to MongoDB server');
});
