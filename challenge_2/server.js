const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const upload = multer();

const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(upload.array());


server.get('/', (req, res) => {

});

server.post('/' , (req, res) => {
  console.log('Received a request from ' + req.hostname + '. Here it is: ' + JSON.stringify(req.body));
  //res.render()

  res.sendFile(path.join(__dirname + '/client/index.html'));

});



server.listen(3000, () => {
   console.log('CSV report generator is listening on port 3000!');
});