'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('kazamax', [
  'ui.router',
  'pascalprecht.translate',
  'ngAnimate'
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

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })
      .state('business', {
        url: '/business',
        templateUrl: 'templates/business.html'
      })
      .state('business.oportunity', {
        url: '/the-oportunity',
        templateUrl: 'templates/business.the-oportunity.html'
      })
      .state('business.challenge', {
        url: '/the-challenge',
        templateUrl: 'templates/business.the-challenge.html'
      })
      .state('business.challenge.identifying', {
        url: '/identifying-the-drivers-of-success',
        templateUrl: 'templates/business.the-challenge.identifying-the-drivers-of-success.html'
      })
      .state('business.challenge.operation', {
        url: '/setting-up-the-operation',
        templateUrl: 'templates/business.the-challenge.setting-up-the-operation.html'
      })
      .state('business.challenge.distributor', {
        url: '/getting-results-from-your-distributor',
        templateUrl: 'templates/business.the-challenge.getting-results-from-your-distributor.html'
      })
      .state('business.challenge.subsidiary', {
        url: '/managing-your-subsidiary',
        templateUrl: 'templates/business.the-challenge.managing-your-subsidiary.html'
      })
      .state('kazamax', {
        url: '/kazamax',
        templateUrl: 'templates/kazamax.html'
      })
      .state('kazamax.services', {
        url: '/what-we-offer',
        templateUrl: 'templates/kazamax.what-we-offer.html'
      })
      .state('kazamax.advantages', {
        url: '/out-advantages',
        templateUrl: 'templates/kazamax.our-advantages.html'
      })
      .state('kazamax.diferentials', {
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
  }])

  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
      'button.menu': 'Menu',
      'button.pt': 'Português',
      'button.en': 'English',
      'button.read-more': 'Read more',
      'button.more-info': 'More info',
      'button.close': 'Close',
      'title.about-business': 'About your business in Brazil',
      'title.oportunity': 'The Oportunity',
      'title.challenge': 'The Challenge',
      'title.identifying': 'Identifying the drivers of success',
      'title.operation': 'Setting up the operation',
      'title.distributor': 'Getting results from your Distributor',
      'title.subsidiary': 'Managing your Subsidiary',
      'title.about-kazamax': 'About Kazamax',
      'title.services': 'What we offer',
      'title.advantages': 'Our advantages',
      'title.diferentials': 'What sets us apart',
      'title.cases': 'Cases',
      'title.contact': 'Contact'
  });

  $translateProvider.translations('pt_BR', {
    'button.menu': 'Menu',
    'button.pt': 'Portuguese',
    'button.en': 'English',
    'button.read-more': 'Leia mais',
    'button.more-info': 'Mais informações',
    'button.close': 'Fechar',
    'title.about-business': 'Sobre o seu negócio no Brasil',
    'title.oportunity': 'A Oportunidade',
    'title.challenge': 'O Desafio',
    'title.identifying': 'Identificando os geradores de sucesso.',
    'title.operation': 'Organizando a operação',
    'title.distributor': 'Obtendo resultados do seu Distribuidor',
    'title.subsidiary': 'Gerenciando a sua Subsidiaria',
    'title.about-kazamax': 'Sobre a Kazamax',
    'title.services': 'O que oferecemos',
    'title.advantages': 'Nossas vantagens',
    'title.diferentials': 'O que nos diferencia',
    'title.cases': 'Cases',
    'title.contact': 'Contato'
  });

  $translateProvider.preferredLanguage('en');
}])

  .controller('TranslationCtrl', ['$scope', '$translate', function($scope, $translate){
      $scope.language = 'en';
      $scope.changeLanguage = function (key) {
        $scope.language = key;
        $translate.use($scope.language);
      };
  }])

  .controller('MainCtrl', ['$scope', function($scope){
      $scope.menuOpen = false;

      $scope.toggleMenu = function(){
        if($scope.menuOpen == true){
          $scope.menuOpen = false;
        }
        else {
          $scope.menuOpen = true;
        }
      };

      $scope.closeMenu = function(){
        $scope.menuOpen = false;
      }
    }])



;
