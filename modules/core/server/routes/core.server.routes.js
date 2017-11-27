'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  //Routes to access database

  app.route('/api/requirements')
    .get(core.listRequirements)
    .post(core.createNewRequirement);
	
  app.route('/api/contact')
    .post(core.send);


  app.route('/api/requirements' + '/:databaseName')
    .get(core.findOneRequirement);

  app.route('/api/studies')
    .get(core.listStudies)
    .post(core.createStudy);

  app.route('/api/studies' + '/:studyId')
    .delete(core.deleteStudy);

  // Define error pages
  app.route('/server-error').get(core.renderServerError);

  // Return a 404 for all undefined api, module or lib routes
  app.route('/:url(api|modules|lib)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);

  app.param('studyId', core.studyById);
  app.param('databaseName', core.requirementByDatabaseName);
};
