/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('WorldCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {

  $rootScope.worldStartId = 0;
  $rootScope.worldnewslist = '';

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listArticles/classid=4" + "&start="+ $rootScope.worldStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.worldnewslist == '')
          $rootScope.worldnewslist = response;
        else
          $rootScope.worldnewslist = response.concat($rootScope.worldnewslist);

        console.log($rootScope.worldnewslist);
        $rootScope.worldStartId=$rootScope.worldStartId+myConfig.fetchNum;

        console.log($rootScope.worldnewslist.length);

        if($rootScope.worldStartId > $rootScope.worldnewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.worldStartId = $rootScope.worldnewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.worldStartId = $rootScope.worldStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

