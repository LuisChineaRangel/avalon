import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import ncp from 'ncp';

import '@db/mongoose';

import { signInRouter } from '@routers/auth/sign-in.router';
import { signUpRouter } from '@routers/auth/sign-up.router';

import { userRouter } from '@routers/user.router';
import { postRouter } from '@routers/post.router';
import { commentRouter } from '@routers/comment.router';

dotenv.config();

let uploadsPath = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadsPath))
    fs.mkdirSync(uploadsPath);

export const app = express();

app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/uploads', (req, res, next) => {
    next();
}, express.static(uploadsPath));
app.use(cors());
app.use(signInRouter);
app.use(signUpRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
