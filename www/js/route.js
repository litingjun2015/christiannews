angular.module('christiannews')

.config(function($stateProvider, $urlRouterProvider, myConfig) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.home', {
      url: '/home',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.church', {
      url: '/church',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-church.html',
          controller: 'ChurchCtrl'
        }
      }
    })
    .state('tab.ministries', {
      url: '/ministries',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-ministries.html',
          controller: 'MinistriesCtrl'
        }
      }
    })
    .state('tab.world', {
      url: '/world',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-world.html',
          controller: 'WorldCtrl'
        }
      }
    })
    .state('tab.society', {
      url: '/society',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-society.html',
          controller: 'SocietyCtrl'
        }
      }
    })
    .state('tab.culture', {
      url: '/culture',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-culture.html',
          controller: 'CultureCtrl'
        }
      }
    })
    .state('tab.tech', {
      url: '/tech',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-tech.html',
          controller: 'TechCtrl'
        }
      }
    })
    .state('tab.opinion', {
      url: '/opinion',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-opinion.html',
          controller: 'OpinionCtrl'
        }
      }
    })

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.news-detail', {
      url: '/news/:newsId',
      views: {
        'tab-news': {
          templateUrl: 'templates/news-detail.html',
          controller: 'NewsDetailCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('tab.info', {
      url: '/info',
      views: {
        'tab-info': {
          templateUrl: 'templates/about.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');


  });
