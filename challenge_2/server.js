const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
//const multer = require('multer');
//const upload = multer({dest: 'uploads/'});
const csvWriter = require('./csvWriter');
const fileUpload = require('express-fileupload');
const fs = require('file-system');

const server = express();

server.use(fileUpload({createParentPath:true}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

//server.use(upload.array());


server.get('/', (req, res) => {

});

server.post('/', (req, res) => {
  //console.log('Received a request from ' + req.hostname + '. Here it is: ' + req.body);
  //console.log(req.body.jsonFile);
  let jsonFile = req.files.jsonFile;
  let filePath = __dirname + '/uploads/' + jsonFile.name;
  jsonFile.mv(path.join(filePath))
    .then(() => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.log(err);
        }
        let csvData = csvWriter.convertToCSVString(JSON.parse(data));
        let csvFileName = __dirname + '/csvFiles/' + jsonFile.name.slice(0, -5) + '.csv';
        fs.writeFile(csvFileName, csvData, (err) => {
          if (err) {
            console.log(err);
          }
          res.sendFile(csvFileName);
          //res.sendFile(path.join(__dirname + '/client/index.html'));



        });
      })
    })
     .catch((err) => {
       console.log(err);
     });


  //fs.readFile()


});


//need a function that converts request body to a csv file

server.listen(3000, () => {
   console.log('CSV report generator is listening on port 3000!');
});