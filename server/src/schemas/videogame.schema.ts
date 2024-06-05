import { Schema, model } from 'mongoose';
import { VideoGame } from '@shared/interfaces/videogame.interface';

const VideoGameSchema = new Schema<VideoGame>({
    name : { type: String, required: true },
    description : { type: String, required: true },
    release_date : { type: Date, required: true },
    rating : { type: Number, required: true },
    genre : { type: String, required: true },
    platforms : { type: String, required: true },
    cover_image : { type: String },
    created_at : { type: Date, default: Date.now },
    updated_at : { type: Date },
    deleted_at : { type: Date }
});

export default model<VideoGame>('VideoGame', VideoGameSchema);
