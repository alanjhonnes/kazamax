'use strict';

// Declare app level module which depends on views, and components
angular.module('kazamax', [
  'myApp.view1',
  'myApp.view2',
  'ui.router'
])
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {

        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      }
    ]
  )

  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'templates/home.html'
    })
    .state('business', {
      url: '/business',
      templateUrl: 'templates/business.html'
    })
    .state('business.the-oportunity', {
      url: '/the-oportunity',
      templateUrl: 'templates/business.the-oportunity.html'
    })
    .state('business.the-challenge', {
      url: '/the-challenge',
      templateUrl: 'templates/business.the-challenge.html'
    })
    .state('business.the-challenge.not-yet-in-brazil', {
      url: '/not-yet-in-brazil',
      templateUrl: 'templates/business.the-challenge.not-yet-in-brazil'
    })
    .state('business.the-challenge.exporting', {
      url: '/exporting',
      templateUrl: 'templates/business.the-challenge.exporting'
    })
    .state('business.the-challenge.distribution', {
      url: '/distribution',
      templateUrl: 'templates/business.the-challenge.distribution'
    })
    .state('business.the-challenge.subsidiary', {
      url: '/subsidiary',
      templateUrl: 'templates/business.the-challenge.subsidiary'
    })
    .state('kazamax', {
      url: '/kazamax',
      templateUrl: 'templates/kazamax.html'
    })
    .state('kazamax.what-we-offer', {
      url: '/what-we-offer',
      templateUrl: 'templates/kazamax.what-we-offer.html'
    })
    .state('kazamax.our-advantages', {
      url: '/out-advantages',
      templateUrl: 'templates/kazamax.our-advantages.html'
    })
    .state('kazamax.what-set-us-apart', {
      url: '/what-set-us-apart',
      templateUrl: 'templates/kazamax.what-set-us-apart.html'
    })
    .state('kazamax.cases', {
      url: '/cases',
      templateUrl: 'templates/kazamax.cases.html'
    })
    .state('kazamax.cases.item', {
      url: '/:item',
      templateUrl: 'templates/kazamax.cases.item.html',
      controller: ['$scope', '$scopeParams', function($scope, $scopeParams){

      }]
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'templates/contact.html',
      controller: ['$scope', '$scopeParams', function($scope, $scopeParams){

      }]
    })
}]);
