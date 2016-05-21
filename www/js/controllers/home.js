/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('HomeCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig) {

  $rootScope.homeStartId = 0;
  $rootScope.homenewslist = '';


  $scope.tasks = [
    {
      name: 'first task 1',
      tree: [
        {
          name: 'first task 1.1'
        }
      ]
    },
    {
      name: 'first task 2'
    }
  ];


  $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
    // process 'item'
    console.log(item);
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

    var url = myConfig.backend + "/listArticles/classid=1" + "&start="+ $rootScope.homeStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.homenewslist == '')
          $rootScope.homenewslist = response;
        else
          $rootScope.homenewslist = response.concat($rootScope.homenewslist);

        console.log($rootScope.homenewslist);
        $rootScope.homeStartId=$rootScope.homeStartId+myConfig.fetchNum;

        console.log($rootScope.homenewslist.length);

        if($rootScope.homeStartId > $rootScope.homenewslist.length)
        {
          //ToastService.showShortCenter('没有新内容了');
          $rootScope.homeStartId = $rootScope.homenewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.homeStartId = $rootScope.homeStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

