import request from 'supertest';
import { describe } from 'mocha';
import { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { app } from '@src/main';
import User from '@src/schemas/user.schema';

let token: string;
let mongoServer: MongoMemoryServer;

before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User API', () => {
    it('should sign up a new user', async () => {
        const response = await request(app)
            .post('/sign-up')
            .send({
                username: "Jhonny",
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                phone_number: "123456789",
                password: "password123"
            })
            .expect(201);
        token = response.body.token;
        const user = await User.findOne({ username: "Jhonny" });
        expect(user).to.not.be.null;
        expect(user!.username).to.equal('Jhonny');
        expect(user!.first_name).to.equal('John');
        expect(user!.last_name).to.equal('Doe');
        expect(user!.email).to.equal('john.doe@example.com');
        expect(user!.phone_number).to.equal('123456789');
    });

    it('should not sign up a new user with the same email', async () => {
        await request(app)
            .post('/sign-up')
            .send({
                username: "Jhonny",
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                phone_number: "123456789",
                password: "password123"
            })
            .expect(409);
    });

    it('should get user profile', async () => {
        const response = await request(app)
            .get('/users/username/Jhonny')
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
        expect(response.body.username).to.equal('Jhonny');
        expect(response.body.first_name).to.equal('John');
        expect(response.body.last_name).to.equal('Doe');
    });
});
