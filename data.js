const movies = [
  { id: 1, title: 'Prisoners', director: 'Denis Villeneuve', year: 2013, genre: 'Thriller' },
  { id: 2, title: 'Scott Pilgrim Vs. The World', director: 'Edgar Wright', year: 2010, genre: 'Action/Comedy' },
  { id: 3, title: 'Garden State', director: 'Zach Braff', year: 2004, genre: 'Drama' },
  { id: 4, title: 'Drive', director: 'Nicolas Winding Refn', year: 2011, genre: 'Action/Drama' },
  { id: 5, title: 'Blade Runner 2049', director: 'Denis Villeneuve', year: 2017, genre: 'Sci-Fi' }
];

export function getAll() {
  return movies;
}

export function getItem(id) {
  return movies.find(movie => movie.id === id);
}