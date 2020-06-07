require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const Server = express();
const dns = require('dns');
const dnsPromises = dns.promises;
const UrlModel = require('./public/js/url.schema');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true},(err) =>{
  err ? console.log('Error on connection') : console.log('Connected Sucessfully');
});

Server.use(bodyParser.json());
Server.use(bodyParser.urlencoded({ extended: true }));
Server.use(express.static('public'));
Server.use(cors());

const getLastUrlId = async () => {
 return await UrlModel.find({}).sort({ _id: -1 }).limit(1).select('-_id url_id');
};

function lookURL(url) {
  return dnsPromises
    .lookup(url)
    .then(() => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

const getUrl = async (id) =>{
  return await UrlModel.find({url_id: id});
}

Server.get('/', async (req,res) =>{
  res.sendFile(__dirname + '/public/views/index.html');
})





const validateURL = async (req,res,next) =>{
  const { url } = req.body;
  res.locals.validURL = await lookURL(url);
  next();
}


Server.post('/api/shorturl/new', validateURL, async(req,res) =>{
  const { validURL } = res.locals;
  const result = await getLastUrlId();
  const [{url_id : lastId}] = result;
  if(validURL){
    const url = new UrlModel({original_url: req.body.url, url_id: lastId + 1});
    url.save((err,data)=>{
      if (err) return console.log(err);
      console.log(data);
      res.send({
        original_url: data.original_url,
        short_url: data.url_id
      });
    })
  }else{
    res.send({
      error : 'invalid URL'
    });
  }
})

Server.get('/api/shorturl/:id', async (req,res) =>{
  console.log(req.params);
  const result = await getUrl(req.params.id);
  const url = result[0].original_url;
  res.redirect(`https://www.${url}`);
})

Server.listen(process.env.PORT || 3000, function () {
  console.log("Express listening on port: " + this.address().port);
});

