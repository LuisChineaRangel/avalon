import * as express from "express";
import * as bodyParser from "body-parser";
import multer from "multer";
import path from "path";

import auth from "@middleware/auth";

import User from "@schemas/user.schema";
import Post from "@schemas/post.schema";

export const userRouter = express.Router();

const storage = multer.diskStorage({
    destination: function (_, __, cb) {
        cb(null, "uploads/");
    },
    filename: function (_, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension);
    }
});

const upload = multer({ storage: storage });

userRouter.use(bodyParser.json());

userRouter.get("/users", auth, async (_, res) => {
    try {
        await User.find().then((users) => {
            if (!users)
                return res.status(404).send("No users found");
            users.sort((a, b) => a.username.localeCompare(b.username));
            return res.status(200).send(users);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.get("/users/:id", auth, async (req, res) => {
    try {
        await User.findById(req.params.id).then((user) => {
            if (!user)
                return res.status(404).send("User not found");
            return res.status(200).send(user);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.delete("/users/:id", auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id).then((user) => {
            if (!user)
                return res.status(404).send("User not found");
            return res.status(200).send(user);
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.patch("/users/:id", auth, async (req, res) => {
    try {
        await User.findByIdAndUpdate
            (req.params.id, req.body
                , { new: true, runValidators: true }).then((user) => {
                    if (!user)
                        return res.status(404).send("User not found");
                    return res.status(200).send(user);
                }).catch((err) => {
                    console.log(err);
                    return res.status(500).send("Internal server error");
                });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.get("/users/username/:username", auth, async (req, res) => {
    try {
        await User.findOne({ username: req.params.username }).then(async (user) => {
            if (!user)
                return res.status(404).send("User not found");
            let user_posts: any;
            await Post.find({ author: user.username }).then((posts) => {
                user_posts = posts;
            }).catch((err) => {
                console.log(err);
                return res.status(500).send("Internal server error");
            });
            return res.status(200).send({ username: user.username, first_name: user.first_name, last_name: user.last_name, posts: user_posts, followers: user.followers, following: user.following, created_at: user.created_at });
        }).catch((err) => {
            console.log(err);
            return res.status(500).send("Internal server error");
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

userRouter.post("/users/upload", auth, upload.single('file'), async (req, res) => {
    try {
        console.log(req.file);
        if (!req.file)
            return res.status(400).send("No file uploaded");

        const userId = req.header('userId');
        if (!userId)
            return res.status(400).send("User ID is missing");

        const imageUrl = `/uploads/${req.file.filename}`;
        const user = await User.findByIdAndUpdate(userId, { profileImage: imageUrl }, { new: true });

        if (!user)
            return res.status(404).send("User not found");

        res.status(200).send({ imageUrl });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
});
