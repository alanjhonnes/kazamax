'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('kazamax', [
  'ui.router',
  'pascalprecht.translate',
  'ngAnimate',
  'duScroll',
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
          'main': {
            templateUrl: 'templates/home.html'
          }
        }
      })
      .state('home.business', {
        url: 'business',
        views: {
          'page@': {
            templateUrl: 'templates/page-simple.html'
          }
        }
      })
      .state('home.business.opportunity', {
        url: '/the-opportunity',
        views: {
          'icon': {
            templateUrl: 'templates/icon/opportunity.html'
          },
          'content': {
            templateUrl: 'templates/business.the-opportunity.html'
          }
        }
      })
      .state('home.business.challenge', {
        url: '/the-challenge',
        views: {
          'icon': {
            templateUrl: 'templates/icon/challenge.html'
          },
          'content': {
            templateUrl: 'templates/business.the-challenge.html'
          }
        }
      })
      .state('home.business.challenge.identifying', {
        url: '/identifying-the-drivers-of-success',
        views: {
          'content@home.business': {
            templateUrl: 'templates/business.the-challenge.identifying-the-drivers-of-success.html'
          },
          'button@home.business': {
            templateUrl: 'templates/button/challenge.html'
          }
        }

      })
      .state('home.business.challenge.operation', {
        url: '/setting-up-the-operation',
        views: {
          'content@home.business': {
            templateUrl: 'templates/business.the-challenge.setting-up-the-operation.html'
          },
          'button@home.business': {
            templateUrl: 'templates/button/challenge.html'
          }
        }
      })
      .state('home.business.challenge.distributor', {
        url: '/getting-results-from-your-distributor',
        views: {
          'content@home.business': {
            templateUrl: 'templates/business.the-challenge.getting-results-from-your-distributor.html'
          },
          'button@home.business': {
            templateUrl: 'templates/button/challenge.html'
          }
        }
      })
      .state('home.business.challenge.subsidiary', {
        url: '/managing-your-subsidiary',
        views: {
          'content@home.business': {
            templateUrl: 'templates/business.the-challenge.managing-your-subsidiary.html'
          },
          'button@home.business': {
            templateUrl: 'templates/button/challenge.html'
          }
        }
      })
      .state('home.kazamax', {
        url: 'kazamax',
        views: {
          'page@': {
            templateUrl: 'templates/page-simple.html'
          }
        }
      })
      .state('home.kazamax.services', {
        url: '/what-we-offer',
        views: {
          'icon': {
            templateUrl: 'templates/icon/services.html'
          },
          'content': {
            templateUrl: 'templates/kazamax.what-we-offer.html'
          }
        }
      })
      .state('home.kazamax.advantages', {
        url: '/our-advantages',
        views: {
          'icon': {
            templateUrl: 'templates/icon/advantages.html'
          },
          'content': {
            templateUrl: 'templates/kazamax.our-advantages.html'
          }
        }
      })
      .state('home.kazamax.differentials', {
        url: '/what-sets-us-apart',
        views: {
          'icon': {
            templateUrl: 'templates/icon/differentials.html'
          },
          'content': {
            templateUrl: 'templates/kazamax.what-sets-us-apart.html'
          }
        }
      })
      .state('home.kazamax.practices', {
        url: '/practices',
        views: {
          'icon': {
            templateUrl: 'templates/icon/practices.html'
          },
          'content': {
            templateUrl: 'templates/kazamax.practices.html'
          }
        }
      })
  }])

    .controller('TranslationCtrl', ['$scope', '$translate', function($scope, $translate){
      $scope.language = 'en';
      $scope.changeLanguage = function (key) {
        $scope.language = key;
        $translate.use($scope.language);
      };
    }])

    .controller('MainCtrl', ['$scope', '$window', '$document', function($scope, $window, $document){
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

      $scope.scrollToBusiness = function(){
        $scope.closeMenu();
        var element = angular.element(document.getElementById('business'));
        $document.scrollToElement(element, $scope.headerHeight - 1, 1000);
      }

      $scope.scrollToKazamax = function(){
        $scope.closeMenu();
        var element = angular.element(document.getElementById('kazamax'));
        $document.scrollToElement(element, $scope.headerHeight - 1, 1000);
      }

      $scope.scrollToContact = function(){
        $scope.closeMenu();
        var element = angular.element(document.getElementById('contact'));
        $document.scrollToElement(element, $scope.headerHeight - 1, 1000);
      }

      $scope.setHeaderHeight = function(height){
        $scope.headerHeight = height;
      }
    }])

    .controller('ContactController', ['$scope', '$http', function($scope, $http){
      $scope.result = 'hidden';
      $scope.resultMessage;
      $scope.formData; //formData is an object holding the name, email, subject, and message
      $scope.submitButtonDisabled = false;
      $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
      $scope.submit = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {
          $http({
            method  : 'POST',
            url     : 'contact-form.php',
            data    : $.param($scope.formData),  //param method from jQuery
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
          }).success(function(data){
            console.log(data);
            if (data.success) { //success comes from the return json object
              $scope.submitButtonDisabled = true;
              $scope.resultMessage = data.message;
              $scope.result='bg-success';
            } else {
              $scope.submitButtonDisabled = false;
              $scope.resultMessage = data.message;
              $scope.result='bg-danger';
            }
          });
        } else {
          $scope.submitButtonDisabled = false;
          $scope.resultMessage = 'Please fill out all the fields.';
          $scope.result='bg-danger';
        }
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
      'button.back': 'Back',
      'title.about-business': 'About your business in Brazil',
      'title.opportunity': 'The Opportunity',
      'title.challenge': 'The Challenge',
      'title.identifying': 'Identifying the drivers of success',
      'title.operation': 'Setting up the operation',
      'title.distributor': 'Getting results from your Distributor',
      'title.subsidiary': 'Managing your Subsidiary',
      'title.about-kazamax': 'About Kazamax',
      'title.services': 'What we offer',
      'title.services2': 'Which of our offerings makes sense to you?',
      'title.advantages': 'Our advantages',
      'title.differentials': 'What sets us apart',
      'title.practices': 'Best Practices',
      'title.contact': 'Contact',
      'text.partnership': 'Partnership',
      'text.consulting': 'Consulting',
      'text.execution': 'Execution',
      'text.governance': 'Governance',
      'text.home-intro': 'We help companies <span class="blue">successfully</span> navigate the Brazilian market and achieve better results.',
      'text.opportunity': 'The 7th largest economy in the world, Brazil is a land of opportunities for many global players:',
      'text.challenge': 'Brazil can be a challenge for companies seeking to take advantage of the many opportunities the country provides.',
      'text.services': 'Learn what Kazamax can do for you: Partnership, Consulting, Execution, Governance.',
      'text.advantages': 'Find out more about the experience we bring to the table.',
      'text.differentials': 'Kazamax is more than an advisor. Here\'s what makes us different.',
      'text.practices': 'Some of the things you might want to consider when starting a new company.',
      'contact.form-legend': 'Need more info? Contact us.',
      'contact.form.name': 'Name',
      'contact.form.email': 'Email',
      'contact.form.phone': 'Phone',
      'contact.form.message': 'Message',
      'intro.identifying': 'Initially the key challenge might be to have a clear understanding of the drivers of success.',
      'intro.operation': 'Sometimes the key challenge is having the correct set-up and enough resources to take full advantage of the opportunities.',
      'intro.distributor': 'Many companies fall into the “distributor dilemma” and don’t reach the results they expect.',
      'intro.subsidiary': 'Sometimes the results are below expectations in the subsidiary.',
      'page.opportunity': '<h3>The 7th largest economy in the world, Brazil is a land of opportunities for many global players:</h3>' +
      '<ul>' +
      '<li>Brazil has gradually opened up its economy since early 1990s. The level of foreign trade, in relation to the size of the economy, is today similar to that of the USA. </li>' +
      '<li>Brazil has a large presence of international companies.</li>' +
      '<li>The economic and regulatory environment is fairly stable.</li>' +
      '<li>Brazil is for many companies the gateway to South America.</li>' +
      '</ul>' +
      '<p>In global ranking, Brazil is:</p>' +
      '<ul>' +
      '<li>#1 for Casino, Santander, Fiat, Avon, 5àSec...</li>' +
      '<li>#2 for Facebook, C&A...</li>' +
      '<li>#3 for VW, Nivea and Nike...</li>' +
      '<li>#4 for Hyundai, Nestlé, Bayer, Subway, Coca-Cola, Twitter...</li>' +
      '</ul>',
      'page.challenge': '<h3><strong>Brazil</strong> can be a challenge for companies looking to take advantage of the many opportunities the country provides. Many companies hesitate to enter the market or face difficulties trying to establish their businesses. Maybe you recognize some of these common challenges:</h3>',
      'page.challenge.identifying':
      '<ul>' +
      '<li>What is the size of the market opportunity?</li>' +
      '<li>Who are my potential customers?</li>' +
      '<li>Who are my competitors, what are they offering and at what prices?</li>' +
      '<li>What would make the potential customers buy from us?</li>' +
      '<li>Which local structure and resources do we need to succeed? </li>' +
      '<li>Which is the best way to enter the market?</li>' +
      '<li>Should we acquire a local company?</li>' +
      '</ul>',
      'page.challenge.operation':
      '<ul>' +
      '<li>Need for <strong>local stock</strong>, to shorten delivery time. </li>' +
      '<li>Need of strong <strong>management</strong>, to drive business.</li>' +
      '<li>Need for <strong>local assembly</strong>, to reduce sales price. </li>' +
      '<li>Need to work closer with <strong>distributors/partners</strong>, to push their sales effort.</li>' +
      '<li>Need of own <strong>sales force</strong> working directly with end customers, to drive sales and create credibility.</li>' +
      '<li>Need for <strong>technical service</strong>, to give high service level to existing clients.</li>' +
      '<li>Need for <strong>local office</strong>, to provide local contracts and local invoicing, and to show long-term commitment.</li>' +
      '</ul>',
      'page.challenge.distributor':
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
      'page.challenge.subsidiary':
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
      'page.kazamax.services':
      '<div class="col-sm-3 col-xs-6">' +
      '<h3 class="service-title">Partnership</h3>' +
      '<p>' +
      'We join forces to explore the market potential together. The partnership can have different models as for example:<br>' +
      '<ul>' +
      '<li><strong>Representation</strong>. Kazamax represents your company in Brazil and provides a local structure.</li>' +
      '<li><strong>Joint Venture</strong>. We set up a new company, own it together and operate it together.</li>' +
      '<li><strong>Strategic cooperation</strong>. We cooperate in certain areas.</li>' +
      '</ul>' +
      '</p>' +
      '</div>' +
      '<div class="col-sm-3 col-xs-6">' +
      '<h3 class="service-title">Consulting</h3>' +
      '<p>' +
      'Consulting services to provide insight and advice on issues such as:<br>' +
      '<ul>' +
      '<li><strong>The market</strong>. Market studies, business plan, etc.</li>' +
      '<li><strong>The challenges</strong>. How to address the critical business issues.</li>' +
      '<li><strong>The business set-up</strong>. Developing a correct set-up considering sales potential, risks and available resources.</li>' +
      '</ul>' +
      '</p>' +
      '</div>' +
      '<div class="col-sm-3 col-xs-6">' +
      '<h3 class="service-title">Execution</h3>' +
      '<p>' +
      'You are established in Brazil but face challenges with execution, results or support to local management. We can provide  execution support through:<br>' +
      '<ul>' +
      '<li><strong>Workshops</strong>. Facilitate the development of business plans and execution plans in workshops.</li>' +
      '<li><strong>Business Coaching</strong>. Assisting local management to perform better by providing continuous coaching and advice.</li>' +
      '<li><strong>M&A</strong>. Assisting in acquisition, mergers and exits.</li>' +
      '</ul>' +
      '</p>' +
      '</div>' +
      '<div class="col-sm-3 col-xs-6">' +
      '<h3 class="service-title">Governance</h3>' +
      '<p>' +
      'You are already established in Brazil but feel the need to increase control, reduce risk and “be on top” of the business. We can provide support with:<br>' +
      '<ul>' +
      '<li><strong>Governance as a Service</strong>. Assisting foreign based managers by providing local expertise, increase control, reduce risk, etc.in the local subsidiary.</li>' +
      '<li><strong>Advisory Board</strong>. Acting as a Member or setting up an Advisory  Board to get needed expertise, larger network and improved Governance.</li>' +
      '</ul>' +
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
      'page.kazamax.practices': '<p><em>“I participated in two startups during high school and continued with my first international startup before going to University. Over the years I have taken part in approximately 25 startups and business ventures, as a partner, consultant or employee. I have probably made more mistakes than most…and for this I am grateful as I have learnt many valuable lessons. This is a selection of some of the best practices I have identified. Many of them seem obvious, but frequently startups forget to apply them.”</em><br><strong>Johan Fager, Founding Partner of Kazamax </strong></p>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Assemble the Dream Team</h3>' +
      '<p>Some companies’ don´t give adequate attention to recruitment and to building up the right local team. Certain executives actually recruit the first persons they find and then hope they will “pick it up as they go”.<br><em class="emphasis">Best Practice:</em> Recruiting the right people is a key task when starting a new business. When you have found the individuals you should dedicate considerable time to building a well-functioning team, developing the team members, and keeping them focused and motivated.</p>'+
      '</div>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Setting up for success</h3>' +
      '<p>Some companies work and try hard, but never get decent results. This might be due to an inadequate setup, with limitations in structure, resources, people, prices, etc. making it hard to push forward.<br><em class="emphasis">Best Practice:</em> Any business needs the right setup to succeed. Make sure you have the essential components in place to be able to compete effectively, such as price, product, local stock, promotion, delivery times, distribution, etc.</p>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Throw away the Gantt chart</h3>' +
      '<p>You have a plan for the startup, but things are running late, while the costs are ticking away. Plans are often sequential and based on traditional methods such as Gantt charts, which give a false sense of control in a quickly changing environment.<br><em class="emphasis">Best Practice:</em> Planning needs to be flexible, based on priorities, done as a team, with constant re-planning and continuously incorporating what the tem is learning. Methods like Lean thinking or Scrum, helps the team move along at a much quicker speed during the startup.</p>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Execute</h3>' +
      '<p>You know what to do, but can´t get it done fast enough. There are obstacles, lack of resources, changes, etc., getting in the way and consequently the results come in below expectations.<br><em class="emphasis">Best Practice:</em> Execution is not only about taking the “to do” list and start ticking off the items as fast as you can. All involved need to be aligned to the objective and the way forward. The team should also be committed to the end result, having fun, working together, have the required competence and adequate resources.</p>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Sell, sell sell!!!</h3>' +
      '<p>Why aren´t we making the numbers? Operational and administrative issues seem to steal too much time from business development. Management and sales people are spending most of their time in the office.<br><em class="emphasis">Best Practice:</em> Review your daily activities, prioritize and find ways (outsource, delegate, postpone, eliminate, etc.) to have enough time for sales activities. When you have found enough time, defend that time as if your life depended on it (because it does), while developing your sales cadence and your sales pipeline.</p>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Focus on the essential</h3>' +
      '<p>There are so many things to do in a startup and multitasking normally becomes the reality. When trying to move 10 tasks forward at the same time, you will probably finish 2 tasks, while 3 more items are added to the list.<br><em class="emphasis">Best Practice:</em> Prioritize and identify the most essential activities, then solve them one by one. Multitasking slows you down and must be avoided in order to make progress on the most essential activities for the business.</p>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Know your customer</h3>' +
      '<p>Yes, we all believe in the importance of customer focus and we say things like “The customer is always right…even when he is wrong”. Nevertheless, for many companies’ customer focus has not been properly understood or implemented.<br><em class="emphasis">Best Practice:</em> Take it to the next level. Identify how your client sees the business, his goals, what he values, main concerns and which are the key purchasing criteria. Then build trust and help the client move towards his goals (while you move the sales process forward).</p>' +
      '</div>' +
      '<div class="col-sm-6 col-xs-12 best-practice-item">' +
      '<h3 class="best-practice-title">Watch your back</h3>' +
      '<p>Some companies don\'t have adequate control of their operation, the risks and legal issues. This is easy to forget when focus is on growing the business, but the consequences can be massive if risks are not managed.<br><em class="emphasis">Best Practice:</em> Make sure to set up a simple Governance process, controlling the main risks (Tax, HR, Legal, etc.) while also reviewing Business issues on a regular basis.</p>' +
      '</div>'
    });

  $translateProvider.translations('pt_BR', {
    'button.menu': 'Menu',
    'button.pt': 'Portuguese',
    'button.en': 'English',
    'button.read-more': 'Leia mais',
    'button.more-info': 'Mais informações',
    'button.close': 'Fechar',
    'button.submit': 'Enviar',
    'button.back': 'Voltar',
    'title.about-business': 'Sobre o seu negócio no Brasil',
    'title.opportunity': 'A Oportunidade',
    'title.challenge': 'O Desafio',
    'title.identifying': 'Identificando os geradores de sucesso',
    'title.operation': 'Organizando a operação',
    'title.distributor': 'Obtendo resultados do seu Distribuidor',
    'title.subsidiary': 'Gerenciando a sua Subsidiaria',
    'title.about-kazamax': 'Sobre a Kazamax',
    'title.services': 'O que oferecemos',
    'title.services2': 'Qual dos nossos serviços se adequa a você?',
    'title.advantages': 'Nossas vantagens',
    'title.differentials': 'O que nos diferencia',
    'title.practices': 'Melhores Práticas',
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
    'text.practices': 'Alguns pontos que você deve considerar ao começar uma nova empresa.',
    'contact.form-legend': 'Precisa de mais informação? Entre em contato.',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Tel',
    'contact.form.message': 'Mensagem'

  });

  $translateProvider.preferredLanguage('en');
}])





;
