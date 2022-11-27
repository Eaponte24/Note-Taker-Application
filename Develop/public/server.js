const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('../db/db.json')
// uuid variable from npm node package
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// HTML get Routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);


// API Get  Route
app.get('/api/notes', (req, res) => {
    res.json(db);
  });


  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);