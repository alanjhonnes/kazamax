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
              $scope.submitButtonDisabled = false;
              $scope.resultMessage = data.message;
              $scope.result = 'alert-success';
            } else {
              $scope.submitButtonDisabled = false;
              $scope.resultMessage = data.message;
              $scope.result = 'alert-danger';
            }
          });
        } else {
          $scope.submitButtonDisabled = false;
          $scope.resultMessage = 'contact.fill-fields';
          $scope.result = 'alert-danger';
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
      'contact.success': 'Thank you! Message was sent succesfully.',
      'contact.server-error': 'Error sending message, please try again.',
      'contact.fill-fields': 'Please fill all the fields.',
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
      '<div class="col-sm-6 col-lg-3">' +
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
      '<div class="col-sm-6 col-lg-3">' +
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
      '<div class="col-sm-6 col-lg-3">' +
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
      '<div class="col-sm-6 col-lg-3">' +
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
      '<div class="col-lg-6 best-practice-item">' +
      '<h3 class="best-practice-title">Assemble the Dream Team</h3>' +
      '<p>Some companies don´t give adequate attention to recruitment and to building up the right local team. Certain executives actually recruit the first persons they find and then hope they will “pick it up as they go”.<br><em class="emphasis">Best Practice:</em> Recruiting the right people is a key task when starting a new business. When you have found the individuals you should dedicate considerable time to building a well-functioning team, developing the team members, and keeping them focused and motivated.</p>'+
      '</div>' +
      '<div class="col-lg-6 best-practice-item">' +
      '<h3 class="best-practice-title">Setting up for success</h3>' +
      '<p>Some companies work and try hard, but never get decent results. This might be due to an inadequate setup, with limitations in structure, resources, people, prices, etc. making it hard to push forward.<br><em class="emphasis">Best Practice:</em> Any business needs the right setup to succeed. Make sure you have the essential components in place to be able to compete effectively, such as price, product, local stock, promotion, delivery times, distribution, etc.</p>' +
      '</div>' +
      '<div class="col-lg-6 best-practice-item">' +
      '<h3 class="best-practice-title">Throw away the Gantt chart</h3>' +
      '<p>You have a plan for the startup, but things are running late, while the costs are ticking away. Plans are often sequential and based on traditional methods such as Gantt charts, which give a false sense of control in a quickly changing environment.<br><em class="emphasis">Best Practice:</em> Planning needs to be flexible, based on priorities, done as a team, with constant re-planning and continuously incorporating what the tem is learning. Methods like Lean thinking or Scrum, helps the team move along at a much quicker speed during the startup.</p>' +
      '</div>' +
      '<div class="col-lg-6 best-practice-item">' +
      '<h3 class="best-practice-title">Execute</h3>' +
      '<p>You know what to do, but can´t get it done fast enough. There are obstacles, lack of resources, changes, etc., getting in the way and consequently the results come in below expectations.<br><em class="emphasis">Best Practice:</em> Execution is not only about taking the “to do” list and start ticking off the items as fast as you can. All involved need to be aligned to the objective and the way forward. The team should also be committed to the end result, having fun, working together, have the required competence and adequate resources.</p>' +
      '</div>' +
      '<div class="col-lg-6 best-practice-item">' +
      '<h3 class="best-practice-title">Sell, sell sell!!!</h3>' +
      '<p>Why aren´t we making the numbers? Operational and administrative issues seem to steal too much time from business development. Management and sales people are spending most of their time in the office.<br><em class="emphasis">Best Practice:</em> Review your daily activities, prioritize and find ways (outsource, delegate, postpone, eliminate, etc.) to have enough time for sales activities. When you have found enough time, defend that time as if your life depended on it (because it does), while developing your sales cadence and your sales pipeline.</p>' +
      '</div>' +
      '<div class="col-lg-6 best-practice-item">' +
      '<h3 class="best-practice-title">Focus on the essential</h3>' +
      '<p>There are so many things to do in a startup and multitasking normally becomes the reality. When trying to move 10 tasks forward at the same time, you will probably finish 2 tasks, while 3 more items are added to the list.<br><em class="emphasis">Best Practice:</em> Prioritize and identify the most essential activities, then solve them one by one. Multitasking slows you down and must be avoided in order to make progress on the most essential activities for the business.</p>' +
      '</div>' +
      '<div class="col-lg-6 best-practice-item">' +
      '<h3 class="best-practice-title">Know your customer</h3>' +
      '<p>Yes, we all believe in the importance of customer focus and we say things like “The customer is always right…even when he is wrong”. Nevertheless, for many companies’ customer focus has not been properly understood or implemented.<br><em class="emphasis">Best Practice:</em> Take it to the next level. Identify how your client sees the business, his goals, what he values, main concerns and which are the key purchasing criteria. Then build trust and help the client move towards his goals (while you move the sales process forward).</p>' +
      '</div>' +
      '<div class="col-lg-6 best-practice-item">' +
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
    'contact.success': 'Obrigado! Sua mensagem foi enviada com sucesso.',
    'contact.server-error': 'Erro enviando a mensagem, tente novamente.',
    'contact.fill-fields': 'Por favor preencha todos os campos.',
    'title.about-business': 'Sobre o seu negócio no Brasil',
    'title.opportunity': 'A Oportunidade',
    'title.challenge': 'O Desafio',
    'title.identifying': 'Identificando as alavancas do sucesso',
    'title.operation': 'Estabelecendo a operação',
    'title.distributor': 'Obtendo resultados do seu Distribuidor',
    'title.subsidiary': 'Gerenciando a sua Subsidiária',
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
    'text.governance': 'Governança',
    'text.home-intro': 'Nós ajudamos empresas a navegar com <span class="blue">sucesso</span> o mercado brasileiro e alcançar melhores resultados.',
    'text.opportunity': 'Sendo a sétima economia do mundo, o Brasil é uma terra de oportunidades para muitos empreendedores globais.',
    'text.challenge': 'O Brasil pode ser um desafio para empresas que pretendem tirar proveito das muitas oportunidades que o país oferece.',
    'text.services': 'Descubra o que a Kazamax pode fazer por você: Parcerias, Consultoria, Execução e Governança.',
    'text.advantages': 'Saiba mais sobre a experiência que oferecemos.',
    'text.differentials': 'Kazamax é mais do que uma consultoria. Veja o que nos torna diferente.',
    'text.practices': 'Alguns pontos que você deve considerar ao começar uma nova empresa.',
    'contact.form-legend': 'Precisa de mais informação? Entre em contato.',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.phone': 'Tel',
    'contact.form.message': 'Mensagem',
    'intro.identifying': 'Inicialmente o desafio pode ser o de ter um claro entendimento das chaves de sucesso.',
    'intro.operation': 'Algumas vezes o desafio é ter o modelo, a infraestrutura correta e os recursos necessários para aproveitar as oportunidades.',
    'intro.distributor': 'Muitas empresas caem no “dilema do distribuidor” e não alcançam os resultados esperados.',
    'intro.subsidiary': 'Às vezes os resultados estão abaixo das expectativas na subsidiária.',
    'page.opportunity': '<h3>Sendo a sétima maior economia no mundo, o Brasil é uma terra de oportunidades para muitos empreendedores globais.</h3>' +
    '<ul>' +
    '<li>O Brasil vem gradualmente abrindo sua economia desde o inicio dos anos 90. O nível de intercambio comercial internacional em relação ao tamanho da economia hoje, é similar ao dos Estados Unidos;</li>' +
    '<li>O Brasil tem grande presença de empresas internacionais;</li>' +
    '<li>O cenário econômico e regulatório é razoavelmente estável;</li>' +
    '<li>O Brasil é para muitas companhias a porta de entrada para América do Sul.</li>' +
    '</ul>' +
    '<p>No ranking global, o Brasil está:</p>' +
    '<ul>' +
    '<li>#1 para Casino, Santander, Fiat, Avon, 5àSec...</li>' +
    '<li>#2 para Facebook, C&A...</li>' +
    '<li>#3 para VW, Nivea and Nike...</li>' +
    '<li>#4 para Hyundai, Nestlé, Bayer, Subway, Coca-Cola, Twitter...</li>' +
    '</ul>',
    'page.challenge': '<h3>O <strong>Brasil</strong> pode ser um desafio para empresas que pretendem tirar proveito das muitas oportunidades que o país oferece.<br><br>Muitas companhias mostram-se receosas para entrar no mercado ou tem dificuldades para estabelecer o negócio. Talvez você reconheça alguns destes desafios mais comuns:</h3>',
    'page.challenge.identifying':
    '<ul>' +
    '<li>Qual o tamanho da oportunidade de  mercado?</li>' +
    '<li>Quem são meus potenciais clientes?</li>' +
    '<li>Quem são os meus competidores, o que oferecem e a que preço?</li>' +
    '<li>O que faz os clientes em potencial comprarem de nós?</li>' +
    '<li>Qual estrutura local e recursos que precisamos para ter sucesso?</li>' +
    '<li>Qual a melhor maneira de entrar no mercado?</li>' +
    '<li>Devemos adquirir uma empresa local?</li>' +
    '</ul>',
    'page.challenge.operation':
    '<ul>' +
    '<li>Necessidade de <strong>estoque local</strong>, para diminuir o tempo da entrega.</li>' +
    '<li>Necessidade de uma <strong>liderança</strong> forte, para alavancar o negócio.</li>' +
    '<li>Necessidade de <strong>produção local</strong>, para reduzir os preços de venda.</li>' +
    '<li>Necessidade de trabalhar próximo de <strong>distribuidores/parceiros</strong>, para apoiar o esforço de vendas dos mesmos.</li>' +
    '<li>Necessidade de ter um <strong>time de vendas próprio</strong> trabalhando direto com consumidores finais, para aumentar vendas e criar credibilidade.</li>' +
    '<li>Necessidade de <strong>serviço técnico</strong>, para dar um alto nível de serviço aos clientes existentes.</li>' +
    '<li>Necessidade de um <strong>escritório local</strong>, a fim de gerar contratos e faturamento local, além de mostrar compromisso sério a longo prazo.</li>' +
    '</ul>',
    'page.challenge.distributor':
    '<h4>a. O Distribuidor não dá atenção total a Empresa:</h4>' +
    '<ul>' +
    '<li>Distribuidores tem varias linhas de produto competindo por atenção, então eles normalmente focam em produtos que conhecem e estão acostumados a vender.</li>' +
    '<li>Recursos financeiros são limitados e eles não querem investir em estoque local.</li>' +
    '<li>Os Distribuidores consideram importação e prazos longos de entrega como problemas.</li>' +
    '<li>A equipe de vendas tem pouco conhecimento do produto e precisam de suporte do fornecedor.</li>' +
    '<li>Focam em fazer dinheiro agora ao invés de investir no futuro.</li>' +
    '</ul>' +
    '<h4>b. A Empresa não dá atenção total ao Distribuidor:</h4>' +
    '<ul>' +
    '<li>A Empresa tem muitos mercados competindo por recursos.</li>' +
    '<li>O Brasil é muito distante, tem uma cultura e idioma diferente, sistema de imposto complexo. Consequentemente, é difícil entender o distribuidor e suas necessidades.</li>' +
    '<li>O Executivo não tem tempo ou recursos para dar um bom suporte ao distribuidor.</li>' +
    '<li>O Executivo de vendas visita o Brasil 1 a 2 vezes por ano e tem pouca interação com os consumidores finais.</li>' +
    '</ul>',
    'page.challenge.subsidiary':
    '<ul>' +
    '<li>Investimentos e custos podem ser mais altos que o esperado devido às projeções iniciais não terem sido precisas ou detalhadas o bastante.</li>' +
    '<li>Vendas estão abaixo do esperado e negócios em potencial não estão progredindo como planejado.</li>' +
    '<li>Dificuldade em contratar, reter e desenvolver as pessoas certas.</li>' +
    '<li>Os riscos não estão sendo gerenciados de forma adequada (Riscos de negócio, reclamações trabalhistas, impostos).</li>' +
    '<li>A comunicação é difícil devido a diferenças culturais e barreiras de linguagem.</li>' +
    '<li>Não há recursos gerenciais o bastante para dar suporte adequado à subsidiária.</li>' +
    '<li>Problemas de controle.</li>' +
    '</ul>',
    'page.kazamax': '',
    'page.kazamax.services':
    '<div class="col-sm-6 col-lg-3">' +
    '<h3 class="service-title">Parceria</h3>' +
    '<p>' +
    'Nós juntamos forças para explorar o potencial de mercado. A parceria pode ter diferentes modelos, como por exemplo:<br>' +
    '<ul>' +
    '<li><strong>Representação</strong>. A Kazamax representa sua empresa no Brasil e proporciona uma estrutura local.</li>' +
    '<li><strong>Joint Venture</strong>. Nós estabelecemos uma nova empresa, investindo  juntos e operando juntos.</li>' +
    '<li><strong>Cooperação estratégica</strong>. Nós cooperamos em áreas definidas.</li>' +
    '</ul>' +
    '</p>' +
    '</div>' +
    '<div class="col-sm-6 col-lg-3">' +
    '<h3 class="service-title">Consultoria</h3>' +
    '<p>' +
    'Serviços de consultoria que prove entendimento e conselhos para assuntos como:<br>' +
    '<ul>' +
    '<li><strong>O mercado</strong>. Estudos de Mercado, planos de negócio, etc.</li>' +
    '<li><strong>Os desafios</strong>. Como lidar com questões críticas do negócio.</li>' +
    '<li><strong>O modelo de negócio </strong>. Desenvolver um modelo correto considerando o potencial de venda, os riscos e os recursos disponível.</li>' +
    '</ul>' +
    '</p>' +
    '</div>' +
    '<div class="col-sm-6 col-lg-3">' +
    '<h3 class="service-title">Execução</h3>' +
    '<p>' +
    'Você está estabelecido no Brasil, mas enfrenta desafios como execução, resultados ou suporte à gerencia local. Nós podemos providenciar suporte de execução através de:<br>' +
    '<ul>' +
    '<li><strong><em>Workshops</em></strong>. Facilitar o desenvolvimento de planos de negócio e planos de execução em <em>workshops</em>.</li>' +
    '<li><strong>Coaching de negócio</strong>. Ajudar a gerência local a ter melhores resultados providenciando Coaching e conselhos.</li>' +
    '<li><strong>M&A</strong>. Ajudando em aquisições, fusões e vendas de empresas. </li>' +
    '</ul>' +
    '</p>' +
    '</div>' +
    '<div class="col-sm-6 col-lg-3">' +
    '<h3 class="service-title">Governança</h3>' +
    '<p>' +
    'Você já se estabeleceu no Brasil, mas acha que existe a necessidade de aumentar o controle, reduzir riscos e “estar a par” do negócio. Nós podemos ajudar com:<br>' +
    '<ul>' +
    '<li><strong>Governânça como serviço</strong>. Ajudar os responsáveis estrangeiros com <em>expertise</em> local, aumento de controle, redução de riscos, etc. na subsidiária local.</li>' +
    '<li><strong>Conselho Administrativo</strong>. Agir como um Membro ou estabelecer um Conselho para obter a <em>expertise</em> necessária, aumentar o <em>Network</em> e melhorar a Governança.</li>' +
    '</ul>' +
    '</p>' +
    '</div>',
    'page.kazamax.advantages': '<ul>' +
    '<li>Mais de 20 anos de experiência fazendo negócios no Brasil e na América Latina</li>' +
    '<li>Envolvido em mais de 25 <em>startups</em></li>' +
    '<li>Grande experiência  em várias posições de liderança </li>' +
    '<li>Experiência em diversas indústrias</li>' +
    '<li>Sólida rede de parceiros no Brasil, América Latina e Suécia</li>' +
    '<li>Resultados consistentes</li>' +
    '</ul>',
    'page.kazamax.differentials': '<h3>Nós acreditamos em ser mais do que uma consultoria, então nós:</h3>' +
    '<ul>' +
    '<li>nos colocamos no lugar do cliente, e nos certificamos que eles estão felizes;</li>' +
    '<li>preferimos trabalhar como parceiros de longo-prazo, ao invés de somente providenciar serviços ou venda de projetos;</li>' +
    '<li>focamos na execução, para alavancar todo o potencial do negócio;</li>' +
    '<li>valorizamos a experiência prática do negócio, já que somente relatórios bem feitos não garantem resultados concretos;</li>' +
    '<li>alinhamos nossos incentivos com o de nossos clientes, compartilhando investimentos, resultados e riscos.</li>' +
    '</ul>',
    'page.kazamax.practices': '<p><em>“Eu participei de duas startups durante o colégio e continuei com minha primeira startup internacional antes de entrar para a universidade. Ao longo dos anos, eu participei de aproximadamente 25 startups e empreendimentos comerciais como parceiro, consultor ou empregado. Eu provavelmente errei mais que a maioria... e sou grato, pois aprendi muitas lições valiosas. Essa é uma seleção de algumas das melhores práticas que eu identifiquei. Muitas podem parecer óbvias, mas as empresas frequentemente esquecem-se de aplicá-las.”</em><br><strong>Johan Fager, Parceiro Fundador da Kazamax</strong></p>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Monte o Time dos Sonhos</h3>' +
    '<p>Algumas empresas não dão atenção adequada ao recrutamento e à construção da equipe local. Certos executivos, na verdade, contratam as primeiras pessoas que encontram e esperam que eles “aprendam na medida em que avançam”.<br><em class="emphasis">Melhor Prática:</em> Contratar as pessoas certas é uma tarefa-chave ao começar um novo negócio. Após encontrar essas pessoas, você deve dedicar tempo suficiente na construção de uma equipe, desenvolvendo os membros, mantendo-os focados e motivados.</p>'+
    '</div>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Prepare-se para o Sucesso</h3>' +
    '<p>Algumas empresas trabalham muito, mas nunca conseguem bons resultados. Isso pode ser causado pela falta de preparação, limitações na estrutura, recursos, pessoas, preços etc., fazendo com que seja difícil avançar. <br><em class="emphasis">Melhor Prática:</em> Toda empresa precisa de estrutura e recursos adequados para ter sucesso. Tenha certeza de que você tem as peças fundamentais para ser capaz de competir com eficiência, como preço, produto, estoque local, marketing, tempo de entrega, distribuição, etc.</p>' +
    '</div>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Jogue Fora o Diagrama de Gantt</h3>' +
    '<p>Você tem um plano para o startup, mas as coisas estão se atrasando, enquanto o negócio continua gerando custos. Planos geralmente são sequenciais e baseados em métodos tradicionais, como diagramas de Gantt, que dão uma falsa sensação de controle em um ambiente em constante mudança.<br><em class="emphasis">Melhor Prática:</em> O planejamento precisa ser flexível, baseado em prioridades, feito junto com a equipe, com replanejamento constante e sempre incorporando o que a equipe aprende. Metodologias como <em>“Lean Thinking”</em> ou <em>“Scrum”</em> ajudam a equipe a avançar com uma velocidade muito maior durante o início do negócio.</p>' +
    '</div>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Execute</h3>' +
    '<p>Você sabe o que fazer, mas não consegue fazê-lo rápido o bastante. Há obstáculos, falta de recursos, mudanças etc., atrapalhando você e, consequentemente, os resultados obtidos estão abaixo do esperado.<br><em class="emphasis">Melhor Prática:</em> Executar não é só pegar a lista de tarefas e começar a riscar os itens realizados o mais rápido possível. Todos os envolvidos devem estar alinhados com o objetivo e o plano de implementação. A equipe deve estar comprometida com o resultado final, se divertindo, trabalhando juntos, com a competência necessária e os recursos adequados.</p>' +
    '</div>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Venda, Venda, Venda!</h3>' +
    '<p>Por que não estamos atingindo nossas metas? Problemas operacionais e administrativos parecem tirar muito tempo do desenvolvimento do negócio. A liderança e a equipe de vendas estão passando a maior parte do seu tempo dentro do escritório.<br><em class="emphasis">Melhor Prática:</em> Reveja suas atividades diárias, priorize e encontre formas (terceirizar, delegar, adiar, eliminar etc.) para ter tempo suficiente para as atividades de venda. Quando encontrar este tempo, defenda-o como se sua vida dependesse disso (porque ela depende), enquanto desenvolve seu processo e funil de vendas.</p>' +
    '</div>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Concentre-se no Essencial</h3>' +
    '<p>Há tantas tarefas a realizar em um startup que fazer várias coisas ao mesmo tempo normalmente se torna uma realidade. Quando você tenta realizar dez tarefas ao mesmo tempo, você provavelmente conclui duas, enquanto outras três são adicionadas à lista. <br><em class="emphasis">Melhor Prática:</em> Priorize e identifique as atividades mais essenciais e, então, execute-as uma por uma. Fazer várias coisas ao mesmo tempo diminui seu rendimento e deve ser evitado, para que se possa progredir nas atividades mais essenciais para o negócio.</p>' +
    '</div>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Conheça Seu Cliente </h3>' +
    '<p>Sim, todos nós acreditamos na importância de ter o cliente como foco e dizemos coisas como: “O cliente está sempre certo... mesmo quando ele está errado”. Contudo, em muitas empresas, o foco no cliente não é adequadamente compreendido ou implementado.<br><em class="emphasis">Melhor Prática:</em> Identifique como seu cliente vê o negócio, seus objetivos, o que ele valoriza, quais são suas principais preocupações e quais são seus critérios-chave para a compra. Então, construa confiança no relacionamento e ajude seu cliente a caminhar em direção às suas metas (enquanto você avança seu processo de venda).</p>' +
    '</div>' +
    '<div class="col-lg-6 best-practice-item">' +
    '<h3 class="best-practice-title">Proteja-se </h3>' +
    '<p>Algumas empresas não têm controle adequado de suas operações, seus riscos e questões jurídicas. Isso é fácil de esquecer quando o foco está no crescimento do negócio, mas as consequências podem ser enormes se os riscos não forem gerenciados.<br><em class="emphasis">Melhor Prática:</em> Estabeleça um processo simples de governança, controlando os principais riscos (Impostos, RH, Jurídico etc.) enquanto revisa as questões do negócio regularmente.</p>' +
    '</div>'


  });

  $translateProvider.preferredLanguage('en');
}])





;
