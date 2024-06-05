import * as express from 'express';
import * as bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

import auth from "@middleware/auth";

import Comment from '@schemas/comment.schema';

export const commentRouter = express.Router();

commentRouter.use(bodyParser.json());

commentRouter.get('/comments', auth, async (_, res) => {
    try {
        await Comment.find().then((comments) => {
            if (!comments)
                return res.status(404).send('No comments found');
            comments.sort((a, b) => a.content.localeCompare(b.content));
            return res.status(200).send(comments);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

commentRouter.get('/comments/:id', auth, async (req, res) => {
    try {
        await Comment.findById(req.params.id).then((comment) => {
            if (!comment)
                return res.status(404).send('Comment not found');
            return res.status(200).send(comment);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

commentRouter.delete('/comments/:id', auth, async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id).then((comment) => {
            if (!comment)
                return res.status(404).send('Comment not found');
            return res.status(200).send(comment);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});

commentRouter.patch('/comments/:id', auth, async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.id, req.body).then((comment) => {
            if (!comment)
                return res.status(404).send('Comment not found');
            return res.status(200).send(comment);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send('Internal server error');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
    }
});
