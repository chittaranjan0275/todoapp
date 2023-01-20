const express = require('express');
const mongodb = require('mongodb');
const app = express();
const bodyParser = require('body-parser');
const {listen} = require("express/lib/application");
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug')


const url = 'mongodb://localhost:27017';
const dbName = 'todoapp';

const client = new mongodb.MongoClient(url, {useNewUrlParser: true});
client.connect((err) => {
    if (err) throw err;
    console.log('Connected to MongoDB');
});


app.get('/', (req, res) => {
    client.db(dbName).collection('todos').find({}).toArray((err, todos) => {
        if (err) throw err;
        res.render('index', {todos});
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add-todo', (req, res) => {
    const todo = {text: req.body.text};
    client.db(dbName).collection('todos').insertOne(todo, (err) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// listenning on port 3000
app.listen(3000, () => {
    console.log(" http://localhost:3000")
})