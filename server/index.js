require('dotenv').config()
const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();
// const {SERVER_PORT} = process.env
const {seed} = require('./seed.js') 

app.use(cors());
app.use(express.json());

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '0c36509e3fc44b3fa1802e6ee41b95ee',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.post('/seed', seed)

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
    rollbar.log("Accessed HTML successfully")
});

app.get('/select.html', function(req,res) {
  res.sendFile(path.join(__dirname, '../client/select.html'));
     rollbar.log("Accessed HTML successfully")
});

app.get('/mypaintings.html', function(req,res) {
  res.sendFile(path.join(__dirname, '../client/myPaintings.html'));
    rollbar.log("Accessed HTML successfully")
});

app.get('/painting.html', function(req,res) {
  res.sendFile(path.join(__dirname, '../client/painting.html'));
     rollbar.log("Accessed HTML successfully")
// });

app.get('/index.css', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/index.css'))
      rollbar.log("Accessed css successfully")
  })

app.get('/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/main.js'))
      rollbar.log("Accessed js file successfully")
  })

app.get('/utils.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/utils.js'))
    rollbar.log("Accessed js file successfully")
}) 


  app.get('/mypaintings.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/myPaintings.js'))
      rollbar.log("Accessed js file successfully")
  })

  app.get('/painting.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/painting.js'))
      rollbar.log("Accessed js file successfully")
  })

const {getPaintings, getProfileDetails, addPainting, updatePainting, deletePainting, getPaintingById } = require('./controller');

// app.get("/api/profileDetails/:profileId", getProfileDetails);
app.get("/api/profileDetails", getProfileDetails);
app.get("/api/paintings/:profileId", getPaintings);
app.post("/api/painting", addPainting);
app.put("/api/painting/:id", updatePainting); 
app.delete("/api/painting/:id", deletePainting); 
app.get("/api/painting/:id", getPaintingById);

const SERVER_PORT = process.env.PORT || 4000

app.listen(SERVER_PORT, () => console.log("Server running on 4000"));
