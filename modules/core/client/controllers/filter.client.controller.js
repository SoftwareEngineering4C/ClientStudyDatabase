'use strict';
var App = angular.module('studyApp', ['ngResource', 'App.filters']);
App.controller('StudyCtrl', ['$scope', function ($scope) {

    $scope.validStudy = [];

    $scope.age_lower_bound = [{

       id: 1,
        name: '18'
    }, {
        id: 2,
        name: '21'
    }, {
        id: 3,
        name: '30'
    },
        id: 4,
        name: '35'
    }, {
        id: 5,
        name: '50'
    }, {
        id: 6,
        name: '80'
    },
        id: 7,
        name: '85'
    }, {
        id: 8,
        name: '90'
 }];

$scope.lar_consent = [{

   id: 1,
    name: 'Y'
},{
    id: 2,
    name: 'N'
}];

$scope.tia_diagnosis = [{

   id: 1,
    name: 'Y'
},{
    id: 2,
    name: 'N'
}];

$scope.minor_stroke = [{

   id: 1,
    name: 'Y'
},{
    id: 2,
    name: 'N'
}];

$scope.hemorrhage = [{

   id: 1,
    name: 'Y'
},{
    id: 2,
    name: 'N'
}];

$scope.stenosis_percentage = [{

   id: 1,
    name: '> 70'
},{
  id: 2,
   name: '> 50'
},{
    id: 3,
    name: '< 50'
},{
    id: 4,
   name: 'N/A'
}];


  $scope.studies = [
    {
        study_name: 'ARAMIS',
        description: "Diagnosed w/acute ischemic stroke, and have been treated with dabigatran, rivaroxaban, apixaban, edoxaban within 7 days prior to admission",
        age_lower_bound: {
            id: 1,
            name: '18'
        }
        lar_consent: {
            id: 1,
            name: 'Y'
        }
        tia_diagnosis: {
            id: 2,
            name: 'N'
        }
        minor_stroke: {
            id: 2,
            name: 'N'
        }
        hemorrhage: {
            id: 1,
            name: 'Y'
        }
        stenosis_percentage: {
            id: 4,
            name: 'N/A'
        }
      },

      {
          study_name: 'COBIS II (R)',
          description: "Allogeneic Umbilical Cord Blood Infusion for Adults w/ Ischemic Stroke",
          age_lower_bound: {
              id: 1,
              name: '18'
          }
          lar_consent: {
              id: 1,
              name: 'Y'
          }
          tia_diagnosis: {
              id: 2,
              name: 'N'
          }
          minor_stroke: {
              id: 2,
              name: 'N'
          }
          hemorrhage: {
              id: 2,
              name: 'N'
          }
          stenosis_percentage: {
              id: 4,
              name: 'N/A'
          }
        },

        {
            study_name: 'COBIS II (L)',
            description: "Allogeneic Umbilical Cord Blood Infusion for Adults w/ Ischemic Stroke",
            age_lower_bound: {
                id: 1,
                name: '18'
            }
            lar_consent: {
                id: 1,
                name: 'Y'
            }
            tia_diagnosis: {
                id: 2,
                name: 'N'
            }
            minor_stroke: {
                id: 2,
                name: 'N'
            }
            hemorrhage: {
                id: 2,
                name: 'N'
            }
            stenosis_percentage: {
                id: 4,
                name: 'N/A'
            }
          },

          {
              study_name: 'INTREPID (sub-hemorrhage)',
              description: "Impact of Fever Prevention in Brain Injured Patients",
              age_lower_bound: {
                  id: 2,
                  name: '21'
              }
              lar_consent: {
                  id: 1,
                  name: 'Y'
              }
              tia_diagnosis: {
                  id: 2,
                  name: 'N'
              }
              minor_stroke: {
                  id: 2,
                  name: 'N'
              }
              hemorrhage: {
                  id: 2,
                  name: 'N'
              }
              stenosis_percentage: {
                  id: 4,
                  name: 'N/A'
              }
            },

            {
                study_name: 'CREST-II',
                description: "Carotid Revascularization & Medical Management for Asymptomatic Carotid Stenosis Trials",
                age_lower_bound: {
                    id: 4,
                    name: '35'
                }
                lar_consent: {
                    id: 2,
                    name: 'N'
                }
                tia_diagnosis: {
                    id: 2,
                    name: 'N'
                }
                minor_stroke: {
                    id: 2,
                    name: 'N'
                }
                hemorrhage: {
                    id: 2,
                    name: 'N'
                }
                stenosis_percentage: {
                    id: 1,
                    name: '> 70'
                }
              },
    }];

    $scope.setSelectedLowerBoundAge = function () {
        var id = this.age_lower_bound.id;

        if (_.contains($scope.validStudy, id)) {
            $scope.validStudy = _.without($scope.validStudy, id);
        } else {
            $scope.validStudy.push(id);
        }

        return false;
    };

    $scope.setSelectedLarConsent = function () {
        var id = this.lar_consent.id;

        if (_.contains($scope.validStudy, id)) {
            $scope.validStudy = _.without($scope.validStudy, id);
        } else {
            $scope.validStudy.push(id);
        }

        return false;
    };

    $scope.setSelectedTiaDiagnosis = function () {
        var id = this.tia_diagnosis.id;

        if (_.contains($scope.validStudy, id)) {
            $scope.validStudy = _.without($scope.validStudy, id);
        } else {
            $scope.validStudy.push(id);
        }

        return false;
    };

    $scope.setSelectedMinorStroke = function () {
        var id = this.minor_stroke.id;

        if (_.contains($scope.validStudy, id)) {
            $scope.validStudy = _.without($scope.validStudy, id);
        } else {
            $scope.validStudy.push(id);
        }

        return false;
    };

    $scope.setSelectedHemorrhage = function () {
        var id = this.hemorrhage.id;

        if (_.contains($scope.validStudy, id)) {
            $scope.validStudy = _.without($scope.validStudy, id);
        } else {
            $scope.validStudy.push(id);
        }

        return false;
    };

    $scope.setSelectedStenosisPercentage = function () {
        var id = this.stenosis_percentage.id;

        if (_.contains($scope.validStudy, id)) {
            $scope.validStudy = _.without($scope.validStudy, id);
        } else {
            $scope.validStudy.push(id);
        }

        return false;
    };

    $scope.isChecked = function (id) {
        if (_.contains($scope.validStudy, id)) {
            return 'icon-ok pull-right';
        }
        return false;
    };

    $scope.checkAll = function () {
        $scope.validStudy = _.pluck($scope.age_lower_bound, 'id');
        $scope.validStudy = _.pluck($scope.lar_consent, 'id');
        $scope.validStudy = _.pluck($scope.tia_diagnosis, 'id');
        $scope.validStudy = _.pluck($scope.minor_stroke, 'id');
        $scope.validStudy = _.pluck($scope.hemorrhage, 'id');
        $scope.validStudy = _.pluck($scope.stenosis_percentage, 'id');

    };
}]);

angular.module('App.filters', []).filter('studyFilter', [function () {
    return function (studies, validStudy) {
        if (!angular.isUndefined(studies) && !angular.isUndefined(validStudy) && validStudy.length > 0) {
            var tempStudies = [];
            angular.forEach(validStudy, function (id) {
                angular.forEach(studies, function (study) {
                    if (angular.equals(study.age_lower_bound.id, id) && angular.equals(study.lar_consent.id, id) && angular.equals(study.tia_diagnosis.id, id) && angular.equals(study.minor_stroke.id, id) && angular.equals(study.hemorrhage.id, id) && angular.equals(study.stenosis_percentage.id, id)) {
                        tempStudies.push(study);
                    }
                });
            });
            return tempStudies;
        } else {
            return studies;
        }
    };
}]);
