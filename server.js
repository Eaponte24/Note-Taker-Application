const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
// uuid variable from npm node package
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// HTML get Routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);


// API Get  Route
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        res.json(JSON.parse(data))
      }
    });
  });

  // API post Route
  app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const {title, text,} = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        review_id: uuid(),
      };
  
      fs.readFile('/api/notes', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedReviews = JSON.parse(data);
  
          parsedReviews.push(newNote);
        
    
      // Write the string to a file
      fs.writeFile(`/api/notes`,
       JSON.stringify(parsedReviews),
       (writeErr) => 
       writeErr
          ? console.error(writeErr)
          : console.info('Successfully updated Notes!')
      );
    }
  });
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting Note');
    }
  });


  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);