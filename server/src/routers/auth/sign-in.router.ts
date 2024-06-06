import * as express from 'express';
import * as bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import User from "@schemas/user.schema";

export const signInRouter = express.Router();

signInRouter.use(bodyParser.json());

signInRouter.post('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    if (user.password !== password)
        return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ email: user.email }, 'secret');
    return res.status(200).json({ token });
});
