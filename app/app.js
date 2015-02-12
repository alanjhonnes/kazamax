'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('kazamax', [
  'ui.router',
  'pascalprecht.translate',
  'ngAnimate',
    'ui.bootstrap'
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
        views: {
          'page': {
            templateUrl: 'templates/page.html'
          },
          'main': {
            templateUrl: 'templates/home.html'
          }
        }
      })
      .state('home.business', {
        url: 'business',
        views: {
          'menu@home': {
            templateUrl: 'templates/business-menu.html'
          },
          'content@home': {
            templateUrl: 'templates/business.the-opportunity.html'
          }
        }
      })
      .state('home.business.opportunity', {
        url: '/the-opportunity',
        views: {
          'content@home': {
            templateUrl: 'templates/business.the-opportunity.html'
          }
        }
      })
      .state('home.business.challenge', {
        url: '/the-challenge',
        views: {
          'content@home': {
            templateUrl: 'templates/business.the-challenge.html'
          }
        }
      })
      .state('home.business.challenge.identifying', {
        url: '/identifying-the-drivers-of-success',
        views: {
          'content@home': {
            templateUrl: 'templates/business.the-challenge.identifying-the-drivers-of-success.html'
          }
        }
      })
      .state('home.business.challenge.operation', {
        url: '/setting-up-the-operation',
        views: {
          'content@home': {
            templateUrl: 'templates/business.the-challenge.setting-up-the-operation.html'
          }
        }
      })
      .state('home.business.challenge.distributor', {
        url: '/getting-results-from-your-distributor',
        views: {
          'content@home': {
            templateUrl: 'templates/business.the-challenge.getting-results-from-your-distributor.html'
          }
        }
      })
      .state('home.business.challenge.subsidiary', {
        url: '/managing-your-subsidiary',
        views: {
          'content@home': {
            templateUrl: 'templates/business.the-challenge.managing-your-subsidiary.html'
          }
        }
      })
      .state('home.kazamax', {
        url: 'kazamax',
        views: {
          'menu@home': {
            templateUrl: 'templates/kazamax-menu.html'
          },
          'content@home': {
            templateUrl: 'templates/kazamax.what-we-offer.html'
          }
        }
      })
      .state('home.kazamax.services', {
        url: '/what-we-offer',
        views: {
          'content@home': {
            templateUrl: 'templates/kazamax.what-we-offer.html'
          }
        }
      })
      .state('home.kazamax.advantages', {
        url: '/our-advantages',
        views: {
          'content@home': {
            templateUrl: 'templates/kazamax.our-advantages.html'
          }
        }
      })
      .state('home.kazamax.differentials', {
        url: '/what-sets-us-apart',
        views: {
          'content@home': {
            templateUrl: 'templates/kazamax.what-sets-us-apart.html'
          }
        }
      })
      .state('home.kazamax.cases', {
        url: '/cases',
        views: {
          'content@home': {
            templateUrl: 'templates/kazamax.cases.html'
          }
        }
      })
      .state('home.kazamax.cases.item', {
        url: '/:item',
        views: {
          'content@home': {
            templateUrl: 'templates/kazamax.cases.item.html'
          }
        },
        controller: ['$scope', '$scopeParams', function($scope, $scopeParams){

        }]
      })
      .state('home.contact', {
        url: '/contact',
        views: {

        },
        controller: ['$scope', '$scopeParams', function($scope, $scopeParams){
        }]
      })
  }])

    .controller('TranslationCtrl', ['$scope', '$translate', function($scope, $translate){
      $scope.language = 'en';
      $scope.changeLanguage = function (key) {
        $scope.language = key;
        $translate.use($scope.language);
      };
    }])

    .controller('MainCtrl', ['$scope', '$window', function($scope, $window){
      $scope.menuOpen = false;
      $scope.wHeight = $window.innerHeight;

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
      };

      var w = angular.element($window);

      w.bind('resize', function(){
        $scope.wHeight = $window.innerHeight;
        $scope.$apply();
      });

      $scope.scrollToContact = function(){
        $scope.closeMenu();
      }

      $scope.setHeaderHeight = function(height){
        $scope.headerHeight = height;
      }


    }])

    .directive('heightObserver', ['$window', function($window){

      var link = function(scope, element, attrs){
        var height = element[0].offsetHeight;
        scope.setHeaderHeight(height);
        var windowElement = angular.element($window);
          windowElement.bind('resize', function(){
            var height = element[0].offsetHeight;
            scope.setHeaderHeight(height);
            //scope.$apply(attrs.heightObserver(height));
        });
      };
      return {
        restrict: 'A',
        link: link
      }

    }])

  .config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
      'button.menu': 'Menu',
      'button.pt': 'Português',
      'button.en': 'English',
      'button.read-more': 'Read more',
      'button.more-info': 'More info',
      'button.close': 'Close',
      'button.submit': 'Submit',
      'title.about-business': 'About your business in Brazil',
      'title.opportunity': 'The Opportunity',
      'title.challenge': 'The Challenge',
      'title.identifying': 'Identifying the drivers of success',
      'title.operation': 'Setting up the operation',
      'title.distributor': 'Getting results from your Distributor',
      'title.subsidiary': 'Managing your Subsidiary',
      'title.about-kazamax': 'About Kazamax',
      'title.services': 'What we offer',
      'title.advantages': 'Our advantages',
      'title.differentials': 'What sets us apart',
      'title.cases': 'Cases',
      'title.contact': 'Contact',
      'text.partnership': 'Partnership',
      'text.consulting': 'Consulting',
      'text.execution': 'Execution',
      'text.governance': 'Governance',
      'text.home-intro': 'We help companies <span class="blue">successfully</span> navigate the Brazilian market and achieve better results.',
      'text.opportunity': 'The 7th largest economy in the world, Brazil is a land of opportunities for many global players:',
      'text.challenge': 'Brazil can be a challenge for companies looking to take advantage of the many opportunities the country provides.',
      'text.services': 'Learn what Kazamax can do for you: Partnership, Consulting, Execution, Governance.',
      'text.advantages': 'Find out more about the experience we bring to the table.',
      'text.differentials': 'Kazamax is more than an advisor. Here\'s what makes us different.',
      'text.cases': 'Learn more about some of our most interesting cases.',
      'contact.form-legend': 'Need more info? Contact us.',
      'contact.form.name': 'Name',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Phone',
      'contact.form.message': 'Message',
      'page.opportunity': '<h3>The 7th largest economy in the world, Brazil is a land of opportunities for many global players:</h3>' +
      '<ul>' +
      '<li>Brazil has gradually opened up its economy since early 1990s. The level of foreign trade, in relation to the size of the economy, is today similar to that of the USA. </li>' +
      '<li>Brazil has a large presence of international companies.</li>' +
      '<li>The economic and regulatory environment is fairly stable.</li>' +
      '<li>Brazil is for many companies the gateway to South America.</li>' +
      '</ul>' +
      '<p>In global ranking, Brazil is:</p>' +
      '<ul>' +
      '<li>#1 for Casino, Santander, Fiat, Avon, 5àSec</li>' +
      '<li>#2 for Facebook, C&A</li>' +
      '<li>#3 for VW, Nivea and Nike</li>' +
      '<li>#4 for Hyundai, Nestlé, Bayer, Subway, Coca-Cola, Twitter</li>' +
      '</ul>',
      'page.challenge': '<h3><strong>Brazil</strong> can be a challenge for companies looking to take advantage of the many opportunities the country provides. Many companies hesitate to enter the market or face difficulties trying to establish their businesses. Our business is to help companies successfully navigate the Brazilian market and achieve better results.</h3>',
      'page.challenge.identifying': '<h3>Initially the key challenge might be to have a clear understanding of the drivers of success.</h3>' +
      '<ul>' +
      '<li>What is the size of the market opportunity?</li>' +
      '<li>Who are my potential customers?</li>' +
      '<li>Who are my competitors, what are they offering and at what prices?</li>' +
      '<li>What would make the potential customers buy from us?</li>' +
      '<li>Which local structure and resources do we need to succeed? </li>' +
      '<li>Which is the best way to enter the market?</li>' +
      '<li>Should we acquire a local company?</li>' +
      '</ul>',
      'page.challenge.operation': '<h3>Sometimes the key challenge is having the correct set-up and enough resources to take full advantage of the opportunities.</h3>' +
      '<ul>' +
      '<li>Need for <strong>local stock</strong>, to shorten delivery time. </li>' +
      '<li>Need of strong <strong>management</strong>, to drive business.</li>' +
      '<li>Need for <strong>local assembly</strong>, to reduce sales price. </li>' +
      '<li>Need to work closer with <strong>distributors/partners</strong>, to push their sales effort.</li>' +
      '<li>Need of own <strong>sales force</strong> working directly with end customers, to drive sales and create credibility.</li>' +
      '<li>Need for <strong>technical service</strong>, to give high service level to existing clients.</li>' +
      '<li>Need for <strong>local office</strong>, to provide local contracts and local invoicing, and to show long-term commitment.</li>' +
      '</ul>',
      'page.challenge.distributor': '<h3>Many companies fall into the “distributor dilemma” and don’t reach the results they expect.</h3>' +
      '<h4>a. The Distributor does not give full attention to the Company:</h4>' +
      '<ul>' +
      '<li>Distributors have many product lines competing for attention, so they normally focus on products they know and are used to selling.</li>' +
      '<li>Financial resources are limited and they don’t want to invest in local stock.</li>' +
      '<li>Distributors consider importing and long delivery times to be a problem.</li>' +
      '<li>The sales force has limited product understanding and need support from the producer.</li>' +
      '<li>Focus on making money today instead of investing for tomorrow.</li>' +
      '</ul>' +
      '<h4>b. The Company does not give full attention to the Distributor:</h4>' +
      '<ul>' +
      '<li>The Company has many important markets competing for resources.</li>' +
      '<li>Brazil is very far away, has a different culture, different language, difficult tax system. Consequently, it is hard to understand the distributor and their needs. </li>' +
      '<li>Executive does not have time/resources to give strong support to the distributor. </li>' +
      '<li>Sales Executive visits Brazil 1-2 times per year and has only limited interaction with final customers.  </li>' +
      '</ul>',
      'page.challenge.subsidiary': '<h3>Sometimes the results are below expectations in the subsidiary.</h3>' +
      '<ul>' +
      '<li>Investments and costs might be higher than expected as the initial projections were not accurate or detailed enough.</li>' +
      '<li>Sales are below expectation and potential deals are not moving forward as planned.</li>' +
      '<li>Difficult to recruit, retain and develop the right people.</li>' +
      '<li>Risks are not being managed properly (business risks, labor claims, taxes). </li>' +
      '<li>Communication is challenging due to cultural differences and language barriers.</li>' +
      '<li>There is not enough management resources to give adequate support to the subsidiary.</li>' +
      '<li>Control issues.</li>' +
      '</ul>',
      'page.kazamax': '',
      'page.kazamax.services': '<h3>Here’s what Kazamax can do for you:</h3>' +
      '<div class="col-sm-3 col-xs-6">' +
      '<img src="/img/partnership.png" alt="" class="img-responsive"/>' +
      '<p>' +
      'We join forces do explore the market potential together.<br>' +
      '<span class="examples">Examples: Representation, Joint-Venture, Strategic Cooperation.</span>' +
      '</p>' +
      '</div>' +
      '<div class="col-sm-3 col-xs-6">' +
        '<img src="/img/consulting.png" alt="" class="img-responsive"/>' +
      '<p>' +
      'We provide insight and advice on critical business issues.<br>' +
      '<span class="examples">Examples: Market Analysis, Business Plans, Operational Strategy.</span>' +
      '</p>' +
      '</div>' +
      '<div class="col-sm-3 col-xs-6">' +
        '<img src="/img/partnership.png" alt="" class="img-responsive"/>' +
      '<p>' +
      'You are already established in Brazil but is facing execution challenges.<br>' +
      '<span class="examples">Examples: Workshops, Business Coaching, M&A.</span>' +
      '</p>' +
      '</div>' +
      '<div class="col-sm-3 col-xs-6">' +
        '<img src="/img/partnership.png" alt="" class="img-responsive"/>' +
      '<p>' +
      'You are already established in Brazil but feel the need to increase control.<br>' +
      '<span class="examples">Examples: Governance aaS, Advisory Board.</span>' +
      '</p>' +
      '</div>',
      'page.kazamax.advantages': '<ul>' +
      '<li>More than 20 years of experience doing Business in Brazil and Latin America</li>' +
      '<li>Involved in more than 20 start-ups </li>' +
      '<li>Extensive hands-on experience from various management positions </li>' +
      '<li>Deep industry experience in a number of areas</li>' +
      '<li>Strong partner network in Brazil, Latin America and Sweden</li>' +
      '<li>Solid track record</li>' +
      '</ul>',
      'page.kazamax.differentials': '<h3>We believe in being more than an adviser, so we:</h3>' +
      '<ul>' +
      '<li>put ourselves in the clients’ shoes, and make sure they are happy.</li>' +
      '<li>prefer working as long-term partners, instead of just providing services or selling projects.</li>' +
      '<li>focus on execution, to unlock the full potential of the business </li>' +
      '<li>value hands-on business experience, as nice reports are no guarantee of tangible results. </li>' +
      '<li>align our incentives with our clients’, by sharing investments, results and risks. </li>' +
      '</ul>',
      'page.kazamax.cases': '<h3>Comming soon.</h3>'


    });

  $translateProvider.translations('pt_BR', {
    'button.menu': 'Menu',
    'button.pt': 'Portuguese',
    'button.en': 'English',
    'button.read-more': 'Leia mais',
    'button.more-info': 'Mais informações',
    'button.close': 'Fechar',
    'button.submit': 'Enviar',
    'title.about-business': 'Sobre o seu negócio no Brasil',
    'title.opportunity': 'A Oportunidade',
    'title.challenge': 'O Desafio',
    'title.identifying': 'Identificando os geradores de sucesso.',
    'title.operation': 'Organizando a operação',
    'title.distributor': 'Obtendo resultados do seu Distribuidor',
    'title.subsidiary': 'Gerenciando a sua Subsidiaria',
    'title.about-kazamax': 'Sobre a Kazamax',
    'title.services': 'O que oferecemos',
    'title.advantages': 'Nossas vantagens',
    'title.differentials': 'O que nos diferencia',
    'title.cases': 'Cases',
    'title.contact': 'Contato',
    'text.partnership': 'Parcerias',
    'text.consulting': 'Consultoria',
    'text.execution': 'Execução',
    'text.governance': 'Governância',
    'text.home-intro': 'Nós ajudamos empresas a navegar com <span class="blue">sucesso</span> o mercado Brasileiro e alcançar melhores resultados.',
    'text.opportunity': 'A sétima economia do mundo, o Brasil é uma terra de oportunidades para muitos empreendedores globais:',
    'text.challenge': 'O Brasil pode ser um desafio para empresas querendo aproveitar as vantagens das muitas oportunidades que o país oferece.',
    'text.services': 'Descubra o que a Kazamax pode fazer por você: Parcerias, Consultoria, Execução e Governancia.',
    'text.advantages': 'Descubra mais sobre a experiência que oferecemos.',
    'text.differentials': 'Kazamax é mais do que uma conselheira. Aqui está o que nos torna diferente.',
    'text.cases': 'Descubra sobre alguns de nossos cases mais interessantes.',
    'contact.form-legend': 'Precisa de mais informação? Entre em contato.',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Tel',
    'contact.form.message': 'Mensagem'

  });

  $translateProvider.preferredLanguage('en');
}])





;
