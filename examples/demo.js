'use strict';

var app = angular.module('demo', ['ui.tree']);

app.controller('DemoCtrl', function($scope, $http, $timeout) {
  $scope.tree = [
    {
      name: 'node 1',
      nodes: [
        {
          name: 'node 1.1',
          nodes: [
            {
              name: 'node 1.1.1'
            },
            {
              name: 'node 1.1.2'
            }
          ]
        },
        {
          name: 'node 1.2',
          nodes: [
            {
              name: 'node 1.2.1'
            },
            {
              name: 'node 1.2.2'
            }
          ]
        }
      ]
    },
    {
      name: 'node 2',
      nodes: [
        {
          name: 'node 2.1',
          nodes: [
            {
              name: 'node 2.1.1'
            },
            {
              name: 'node 2.1.2'
            }
          ]
        },
        {
          name: 'node 2.2',
          nodes: [
            {
              name: 'node 2.2.1'
            },
            {
              name: 'node 2.2.2'
            }
          ]
        }
      ]
    },
    {
      name: 'node 3',
      nodes: [
        {
          name: 'node 3.1',
          nodes: [
            {
              name: 'node 3.1.1'
            },
            {
              name: 'node 3.1.2'
            }
          ]
        },
        {
          name: 'node 3.2',
          nodes: [
            {
              name: 'node 3.2.1'
            },
            {
              name: 'node 3.2.2'
            }
          ]
        }
      ]
    }
  ];
});