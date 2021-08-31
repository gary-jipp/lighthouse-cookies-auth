const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();
const port = 8080;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(cookieParser());

app.set('view engine', 'ejs');

// GET /home
app.get('/home', (req, res) => {
  const animal = req.cookies.animal || '____';

  const templateVars = { animal };
  res.render('home', templateVars);
});

// GET /about
app.get('/about', (req, res) => {
  const animal = req.cookies.animal || '____';

  const templateVars = { animal };
  res.render('about', templateVars);
});

app.get('/animals/clear', (req, res) => {
  res.clearCookie('animal');
  res.redirect("/home");
});

// GET /animals/:animalName - set animal cookie
app.get('/animals/:animalName', (req, res) => {
  const animalName = req.params.animalName;

  // set the cookie with animal preference
  res.cookie('animal', animalName);
  res.redirect('/home');
});

app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});
