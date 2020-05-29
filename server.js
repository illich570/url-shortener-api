require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const Server = express();

Server.use(express.static('public'));
Server.use(cors());

Server.get('/',(req,res) =>{
  res.sendFile(__dirname + '/public/views/index.html');
})

Server.listen(process.env.PORT || 3000, function () {
  console.log("Express listening on port: " + this.address().port);
});

