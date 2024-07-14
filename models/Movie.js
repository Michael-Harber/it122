import mongoose from 'mongoose';
const {Schema} = mongoose;

const movieSchema = new Schema({
title: { type: String, required: true },
director: String,
year: Number,
genre: String,
});

const Movie = mongoose.model('Movies', movieSchema);

export default Movie;

