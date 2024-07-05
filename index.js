'use strict'
import express from 'express';
import { getAll, getItem } from './data.js';

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded());



app.get('/', (req, res) => {
  const movies = getAll();
  res.render('home', { items: movies });
});

app.get('/detail', (req, res) => {
  const itemId = req.query.id;
  const item = getItem(parseInt(itemId));
  const pageTitle = item ? `Detail for ${item.title}` : 'Movie Not Found';
  res.render('detail', { item, pageTitle });
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