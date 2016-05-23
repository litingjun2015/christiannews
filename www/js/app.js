// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('christiannews', ['ionic', 'ngCordova', 'christiannews.controllers', 'starter.services', 'christiannews.services', 'ion-tree-list'])

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

app.directive('ngEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function (event) {
      if(event.which === 13) {
        scope.$apply(function (){
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();
      }
    });
  };
});

app.run(function($ionicPlatform, $rootScope, $ionicHistory, $window, UtilityService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });


  ///////////////////////////////////////////////////////////////////////////////////
  $ionicPlatform.registerBackButtonAction(function(e){
    if ($rootScope.backButtonPressedOnceToExit) {
      $window.location.reload(true);
      UtilityService.clearcache();
      ionic.Platform.exitApp();
    }

    else if ($ionicHistory.backView()
      && $ionicHistory.currentStateName() !== 'tab.home'
      && $ionicHistory.currentStateName() !== 'tab.church'
      && $ionicHistory.currentStateName() !== 'tab.ministries'
      && $ionicHistory.currentStateName() !== 'tab.world'
      && $ionicHistory.currentStateName() !== 'tab.society'
      && $ionicHistory.currentStateName() !== 'tab.culture'
      && $ionicHistory.currentStateName() !== 'tab.tech'
      && $ionicHistory.currentStateName() !== 'tab.opinion') {

      $ionicHistory.goBack();
    }
    else {

      $rootScope.backButtonPressedOnceToExit = true;
      window.plugins.toast.showWithOptions(
        {
          message: "再按一次退出基督教新闻",
          duration: "short",
          position: "bottom",
          addPixelsY: -10  // added a negative value to move it up a bit (default 0)
        },
        function(a){},function(b){}
      );
      setTimeout(function(){
        $rootScope.backButtonPressedOnceToExit = false;
      },2000);
    }
    e.preventDefault();
    return false;
  },101);



})

app.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(5);
  //配置android平台的缓存
  $ionicConfigProvider.platform.android.views.maxCache(5);

  // note that you can also chain configs
  $ionicConfigProvider.backButton.text('上一页').icon('ion-chevron-left');

  $ionicConfigProvider.tabs.position('bottom');
});

app.config(function($stateProvider, $urlRouterProvider) {



});
