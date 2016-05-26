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

    .state('tab.searchinput', {
      url: '/searchinput',
      cache: true,
      views: {
        'tab-news': {
          templateUrl: 'templates/news-search-input.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('tab.searchresult', {
      url: '/searchresult',
      cache: false,
      views: {
        'tab-news': {
          templateUrl: 'templates/news-search-result.html',
          controller: 'SearchCtrl'
        }
      }
    })

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
          templateUrl: 'templates/tab-dash-delete.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.demo', {
      url: '/demo',
      views: {
        'tab-demo': {
          templateUrl: 'templates/tab-demo.html',
          controller: 'DemoCtrl'
        }
      }
    })

    .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news-delete.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('tab.news-detail', {
      url: '/news/:newsId',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-news-detail.html',
          controller: 'NewsDetailCtrl'
        }
      }
    })

    .state('tab.recommend', {
      cache: false,
      url:'/recommend',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-recommend.html',
          controller: 'RecommendCtrl'
        },
      },
    })

    .state('tab.wechatusers', {
      cache: false,
      url:'/wechatusers',
      views: {
        'tab-users': {
          templateUrl: 'templates/tab-wechatusers.html',
          controller: 'WechatusersCtrl'
        },
      },
    })

    .state('tab.tagcontent', {
      cache: false,
      url:'/tagcontent',
      views: {
        'tab-news': {
          templateUrl: 'templates/tab-tagcontent.html',
          controller: 'TagcontentCtrl'
        },
      },
      params: {
        'tagId': 1,
        'name': "推荐",
        'positionLeft': 0
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



    .state('tab.my', {
      cache: false,
      url: '/my',
      views: {
        'tab-my': {
          templateUrl: 'templates/account/index.html',
          controller: 'AccountCtrl'
        }
      }
    })

    .state('tab.info', {
      url: '/info',
      views: {
        'tab-my': {
          templateUrl: 'templates/about.html',
          controller: 'AccountCtrl'
        }
      }
    })


    .state('taglist',{
      cache: false,
      url:'/taglist',
      templateUrl: 'templates/tag/taglist.html',
      controller: 'TaglistCtrl'
    })

    //.state('tagcontent',{
    //  cache: false,
    //  url:'/tagcontent/:tagId',
    //  templateUrl: 'templates/tag/tagcontent.html',
    //  controller: 'TagcontentCtrl'
    //})

    .state('tagcontent', {
      cache: false,
      url:'/tagcontent',
      templateUrl:'templates/tag/tagcontent.html',
      controller:'TagcontentCtrl',
      params: {
        'tagId': 1,
        'name': "推荐"
      }
    })

    .state('tagedit',{
      cache: false,
      url:'/tagedit',
      templateUrl: 'templates/tag/tagedit.html',
      controller: 'TageditCtrl'
    })

    .state('mytagedit',{
      cache: false,
      url:'/mytagedit',
      templateUrl: 'templates/tag/mytagedit.html',
      controller: 'TageditCtrl'
    })

    .state('news-detail', {
      url: '/news',
      cache: false,
      templateUrl: 'templates/news-detail.html',
      controller: 'NewsDetailCtrl',
      params: {
        'newsId': 1
      }
    })




  ;


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/recommend');


  });
