// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('christiannews', ['ionic', 'ngCordova', 'christiannews.controllers', 'starter.services', 'christiannews.services'])

app.run(function($ionicPlatform) {
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
