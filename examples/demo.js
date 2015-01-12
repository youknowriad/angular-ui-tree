'use strict';

var app = angular.module('demo', ['ui.tree']);

app.controller('DemoCtrl', function($scope, $http, $timeout) {
  $scope.tree = [
    {
      text: 'node 1',
      nodes: [
        {
          text: 'node 1.1',
          collapsed: true,
          nodes: [
            {
              text: 'node 1.1.1'
            },
            {
              text: 'node 1.1.2'
            }
          ]
        },
        {
          text: 'node 1.2',
          nodes: [
            {
              text: 'node 1.2.1'
            },
            {
              text: 'node 1.2.2'
            }
          ]
        }
      ]
    },
    {
      text: 'node 2',
      nodes: [
        {
          text: 'node 2.1',
          nodes: [
            {
              text: 'node 2.1.1'
            },
            {
              text: 'node 2.1.2'
            }
          ]
        },
        {
          text: 'node 2.2',
          nodes: [
            {
              text: 'node 2.2.1'
            },
            {
              text: 'node 2.2.2'
            }
          ]
        }
      ]
    },
    {
      text: 'node 3',
      nodes: [
        {
          text: 'node 3.1',
          nodes: [
            {
              text: 'node 3.1.1'
            },
            {
              text: 'node 3.1.2'
            }
          ]
        },
        {
          text: 'node 3.2',
          nodes: [
            {
              text: 'node 3.2.1'
            },
            {
              text: 'node 3.2.2'
            }
          ]
        }
      ]
    }
  ];
});