const mongoose = require('mongoose');
const schema = mongoose.Schema;

const urlSchema = new schema({
  original_url : {type: String, required: true},
  url_id: {type: Number, required: true}
});

const UrlModel = mongoose.model('Url', urlSchema);

module.exports = UrlModel;