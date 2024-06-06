import * as express from 'express';
import * as bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import User from "@schemas/user.schema";

export const signUpRouter = express.Router();

signUpRouter.use(bodyParser.json());

signUpRouter.post('/sign-up', async (req, res) => {
    const body = req.body;
    const user = new User({ username: body.username, first_name: body.first_name, last_name: body.last_name, email: body.email, phone_number: body.phone_number, password: body.password });
    console.log('User: ', user);
    await user.save().then((user) => {
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        const token = jwt.sign({ email: user.email }, 'secret');
        return res.status(200).json({ token });
    }).catch((err) => {
        console.log('Error: ', err);
        console.log(err);
        if (err.code === 11000)
            return res.status(409).json({ message: 'User already exists' });
        return res.status(500).json({ message: err });
    });
});
