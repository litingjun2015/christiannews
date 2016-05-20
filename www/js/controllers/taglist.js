/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('TaglistCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig, $ionicHistory) {

  $scope.myGoBack = function() {
    console.log("$ionicHistory.goBack()");
    $state.go("tab.home");
  };

  $rootScope.homeStartId = 0;
  $rootScope.homenewslist = '';

  $scope.tasks = [];


  $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
    // process 'item'
    console.log(item);

    if(item.depth != 1)
      $state.go("tagcontent", { 'tagId':item.id, 'name':item.name })

  });

  $scope.$on('$ionTreeList:LoadComplete', function(event, items) {
    // process 'items'
    console.log(items);
  });

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });

  $rootScope.gosearch = function() {
    $state.go('tab.searchinput');
  };


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/taglist";
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        $scope.tasks = response;

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.homeStartId = $rootScope.homeStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

