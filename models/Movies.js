import mongoose from 'mongoose';
const {Schema} = mongoose;
import {connectionString} from '../credentials.js';

mongoose.connect(connectionString, {
  dbName: 'sccprojects',
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', () => {
console.log('Mongoose connected.');
});

const movieSchema = new Schema({
title: { type: String, required: true },
director: String,
year: Number,
genre: Date,
});

export const Movie = mongoose.model('Movies', movieSchema);