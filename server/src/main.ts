import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

import '@db/mongoose';

import { signInRouter } from '@routers/auth/sign-in.router';
import { signUpRouter } from '@routers/auth/sign-up.router';

import { userRouter } from '@routers/user.router';
import { postRouter } from '@routers/post.router';
import { commentRouter } from '@routers/comment.router';

dotenv.config();

const uploadsPath = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
    console.log('Uploads directory created');
}

export const app = express();

app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/uploads', (req, res, next) => {
    console.log('Request to static files:', req.url);
    console.log(fs.existsSync(uploadsPath));
    console.log(fs.existsSync(uploadsPath + req.url));
    // Displays all files in the uploads directory
    console.log(fs.readdirSync(uploadsPath));
    else {
        next();
    }
    next();
}, express.static(uploadsPath));
app.use(cors());
app.use(signInRouter);
app.use(signUpRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
