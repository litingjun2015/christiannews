angular.module('christiannews.controllers')

.controller('TabsCtrl',  function(myConfig, $window,$scope,$state,$ionicHistory, UserService , ToastService, $cordovaAppVersion, $ionicPlatform, $cordovaEmailComposer, $fileLogger, $sce, $ionicActionSheet, $timeout, $http, $cordovaFileTransfer, $cordovaFile, $fileLogger, UtilityService) {

    $scope.user = UserService.getUser();
    console.log($scope.user);
    $scope.isUserLogin =  UserService.isUserLogin();


  });
