'use strict'
import express from 'express';
import Movie from './models/Movie.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded());



app.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render('home', { items: movies });
  } catch (err) {
    console.error('Error fetching movies', err);
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

app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(app.get('port'), () => {
  console.log(`Express Started`);
});