// Create web server

// import library
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// import module
const comments = require('./comments');

// use middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set view engine
app.set('views', './views');
app.set('view engine', 'pug');

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// get request
app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});

app.get('/comments', (req, res) => {
    res.render('comments', { comments: comments });
});

app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === id);
    res.render('comment', { comment: comment });
});

app.get('/create', (req, res) => {
    res.render('create');
});

app.post('/create', (req, res) => {
    comments.push(req.body);
    res.redirect('/comments');
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === id);
    comments.splice(comments.indexOf(comment), 1);
    res.redirect('/comments');
});

// post request
app.post('/', (req, res) => {
    res.send('POST request to the homepage');
});

// listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});