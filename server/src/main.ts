import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import '@db/mongoose';

import { signInRouter } from '@routers/auth/sign-in.router';
import { signUpRouter } from '@routers/auth/sign-up.router';

import { userRouter } from '@routers/user.router';
import { videogameRouter } from '@routers/videogame.router';
import { postRouter } from '@routers/post.router';
import { commentRouter } from '@routers/comment.router';

dotenv.config();

export const app = express();

app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use(cors());
app.use(signInRouter);
app.use(signUpRouter);
app.use(userRouter);
app.use(videogameRouter);
app.use(postRouter);
app.use(commentRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
