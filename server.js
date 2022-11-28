const express = require('express');
const path = require('path');
const fs = require('fs');

// uuid variable from npm node package
const { v4: uuidv4 } = require('uuid');
const { userInfo } = require('os');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Develop/public'));

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
        id: uuidv4(),
      };
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedReviews = JSON.parse(data);
  
          parsedReviews.push(newNote);
        
    
      // Write the string to a file
      fs.writeFile(`./db/db.json`,
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

  // delete route 
  app.delete("/api/notes/:id", (req, res) => {
    console.info(`${req.method} request received to delete a note`);

        let db = JSON.parse(fs.readFileSync('./db/db.json'))
        
        
        let deleteNotes = db.filter(item => item.id !== req.params.id);
       
       
        fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes));
        res.json(deleteNotes);
        
      })


  app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);