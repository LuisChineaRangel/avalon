import * as express from 'express';
import * as bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import auth from "@middleware/auth";

import Videogame from '@schemas/videogame.schema';

export const videogameRouter = express.Router();

videogameRouter.use(bodyParser.json());

videogameRouter.get('/videogames', auth, async (_, res) => {
    try {
        await Videogame.find().then((videogames) => {
            if (!videogames)
                return res.status(404).send('No videogames found');
            videogames.sort((a, b) => a.name.localeCompare(b.name));
            return res.status(200).send(videogames);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

videogameRouter.get('/videogames/:id', auth, async (req, res) => {
    try {
        await Videogame.findById(req.params.id).then((videogame) => {
            if (!videogame)
                return res.status(404).send('Videogame not found');
            return res.status(200).send(videogame);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

videogameRouter.delete('/videogames/:id', auth, async (req, res) => {
    try {
        await Videogame.findByIdAndDelete(req.params.id).then((videogame) => {
            if (!videogame)
                return res.status(404).send('Videogame not found');
            return res.status(200).send(videogame);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

videogameRouter.patch('/videogames/:id', auth, async (req, res) => {
    try {
        await Videogame.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then((videogame) => {
            if (!videogame)
                return res.status(404).send('Videogame not found');
            return res.status(200).send(videogame);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});
