var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var studySchema = new Schema({
  study_name: {
    type: String
  },
  description: {
    type: String
  }
}, {strict: false});

var Study = mongoose.model('Study', studySchema);

module.exports = Study;
