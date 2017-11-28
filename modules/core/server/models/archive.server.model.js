var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var archiveSchema = new Schema({

  study_name: {
    type: String
  },

}, {strict: false}

);

var Archive = mongoose.model('Archive', archiveSchema);

module.exports = Archive;
