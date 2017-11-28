var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var studySchema = new Schema({
  study_name: {
    type: String
  },
  coordinator:
  {
    type: String
  },
  coordinator_phone_number:
  {
    type: String
  },
  coordinator_email:
  {
    type: String
  }

}, {strict: false});

var Study = mongoose.model('Study', studySchema);

module.exports = Study;
