'use strict';

var validator = require('validator'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  mongoose = require('mongoose'),
  Study = require('../models/study.server.model.js'),
  Requirement = require('../models/requirement.server.model.js');

  var nodemailer = require('nodemailer');
  var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'johnaloomis91@gmail.com',    // your email here
    pass: 'Tomgee1!'          // your password here
  },
  tls: {
      rejectUnauthorized: false
  }
});

  mongoose.connect(config.db.uri);

/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;
  if (req.user) {
    safeUserObject = {
      displayName: validator.escape(req.user.displayName),
      provider: validator.escape(req.user.provider),
      username: validator.escape(req.user.username),
      created: req.user.created.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: validator.escape(req.user.email),
      lastName: validator.escape(req.user.lastName),
      firstName: validator.escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

exports.listStudies = function (req, res) {
  Study.find().exec(function (err, studies) {
    res.json(studies);
  });
};

exports.listRequirements = function (req, res) {
  Requirement.find().exec(function (err, requirements) {
    res.json(requirements);
  });
};

exports.createStudy = function (req, res) {
  var study = new Study(req.body);

  study.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(study);
    }
  });
};

exports.updateStudy = function (req, res) {
  var study = new Study(req.body);
  study.isNew = false;

  console.log(req.body);

  study.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(study);
    }
  });
};

exports.createNewRequirement = function (req, res) {
  var requirement = new Requirement(req.body);

  requirement.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(requirement);
    }
  });
};

exports.deleteStudy = function(req, res) {
  var study = req.study;

  study.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  })

};

exports.studyById = function(req, res, next, id) {
  Study.findById(id).exec(function(err, study) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.study = study;
      next();
    }
  });
};

exports.requirementByDatabaseName = function(req, res, next, databaseName) {
  Requirement.findOne({databaseName: databaseName}).exec(function(err, requirement) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.requirement = requirement;
      next();
    }
  });
};

exports.findOneRequirement = function(req, res) {
  res.json(req.requirement);
}


/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};

exports.send = function(req,res){
  var study = req.body.study;
  console.log('Email:' + study.coordinator_email);
  var htmlContent = '<p>Sent From: ' + study.study_name + ' has a potential patient' + '</p>' +
                    '<p>Sent From: ' + req.body.contact.name + '</p>' +  
                    '<p>Message: ' + req.body.contact.message + '</p>';

  var mailOptions = {
    to: study.coordinator_email,                  // your email here
    subject: study.study_name + ' has a potential patient',
    from: req.body.contact.name,
    sender: req.body.contact.email,
    html: htmlContent
  };
  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      console.log(err);
    }else{
      console.log('Message sent: ' + info.response);
      return res.json(201, info);
    }
  });
}
