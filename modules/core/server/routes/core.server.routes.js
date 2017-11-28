'use strict';

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  //Routes to access database
  app.route('/list').get(core.listResponse);

  app.route('/api/requirements')
    .get(core.listRequirements);

  app.route('/api/requirements' + '/:databaseName')
    .get(core.findOneRequirement);

  app.route('/api/archive')
    .get(core.listArchives)
    .post(core.archiveStudy)
    .post(core.createStudy);

  app.route('/api/archive' + '/:archiveStudyId')
    .delete(core.deleteStudy);

  app.route('/api/studies')
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
  app.param('archiveStudyId', core.archiveStudyById);
  app.param('databaseName', core.requirementByDatabaseName);
};
