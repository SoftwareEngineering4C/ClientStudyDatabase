var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var studySchema = new Schema({
  study_name: {
    type: String
  },
  lar_consent: {
    type: Boolean
  }
});

var Study = mongoose.model('Study', studySchema);

module.exports = Study;
