/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')


.controller('SearchCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig, $ionicHistory) {

  $rootScope.searchStartId = 0;
  $rootScope.searchnewslist = '';
  $rootScope.searchnewslistNum = 0;

  $scope.keywordslist = [];

  $scope.clearKeywordslist = function() {
    $scope.keywordslist = [];
  }

  $scope.goBack = function() {
    $ionicHistory.goBack();
  }

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });

  $scope.search = function(searchkeywords) {

    if(searchkeywords != undefined)
    {
      $rootScope.searchnewslist = null;

      $rootScope.searchkeywords = searchkeywords;
      console.log(searchkeywords);
      $scope.keywordslist.push(searchkeywords);

      if($scope.keywordslist.length > 5)
        $scope.keywordslist.shift();

      var url = myConfig.backend + "/searchArticlesNum/keywordslist=" + $scope.searchkeywords;
      console.log(url);
      $http.get(url)
        .success(function (response)
        {
          console.log(response);
          $rootScope.searchnewslistNum=response[0].num;

          console.log($rootScope.searchnewslistNum);

        }).error(function(response) {

        ToastService.showShortCenter('获取数据失败');
        //$rootScope.searchStartId = $rootScope.searchStartId-myConfig.fetchNum;

      });

      $scope.doRefresh();

      $state.go('tab.searchresult');
    }

  };

  $rootScope.gosearch = function() {
    $state.go('tab.searchinput');
  };


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/searchArticles/keywordslist=" + $scope.searchkeywords  + "&start="+ $rootScope.searchStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.searchnewslist == '')
          $rootScope.searchnewslist = response;
        else
          $rootScope.searchnewslist = response.concat($rootScope.searchnewslist);

        console.log($rootScope.searchnewslist);
        $rootScope.searchStartId=$rootScope.searchStartId+myConfig.fetchNum;

        console.log($rootScope.searchnewslist.length);

        if($rootScope.searchStartId > $rootScope.searchnewslist.length)
        {
          //ToastService.showShortCenter('没有新内容了');
          $rootScope.searchStartId = $rootScope.searchnewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.searchStartId = $rootScope.searchStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

