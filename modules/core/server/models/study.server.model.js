var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var studySchema = new Schema({
  name: {
    type: String
  },
  gender: {
    type: String
  }
});

var Study = mongoose.model('Study', studySchema);

module.exports = Study;
