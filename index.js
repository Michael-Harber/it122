'use strict'
import express from 'express';
import Movie from './models/Movie.js';
import cors from 'cors';
import mongoose from './src/credentials.js';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use('/api', cors());



app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('home', { items: movies});
  } catch (err) {
    console.error('Error fetching movies', err);
    res.status(500).send('Server Error');
  }
});

app.get('/detail', async (req, res) => {
  const itemId = req.query.id;

  try {
    const movie = await Movie.findById(itemId);
    const pageTitle = movie ? `Detail for ${movie.title}` : 'Movie Not Found';
    res.render('detail', { item: movie, pageTitle });
  } catch (err) {
    console.error('Error fetching movie details', err);
  }
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error('Error fetching movies', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(movie);
  } catch (err) {
    console.error('Error fetching movie details', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/api/movies/:id', async (req, res) => {
  try {
    const result = await Movie.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error('Error deleting movie', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/api/movies', async (req, res) => {
  try {
    const { id, ...movieData } = req.body;

    if (id) {
      // Update movie
      const updatedMovie = await Movie.findByIdAndUpdate(id, movieData, { new: true });
      if (!updatedMovie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      res.json(updatedMovie);
    } else {
      // Add new movie
      const newMovie = new Movie(movieData);
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    }
  } catch (err) {
    console.error('Error adding or updating movie', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(app.get('port'), () => {
  console.log(`Express Started`);
});