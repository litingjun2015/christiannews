/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('ChurchCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {

  $rootScope.churchStartId = 0;
  $rootScope.churchnewslist = '';

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });


  $scope.doRefresh = function() {

    var url= myConfig.backend + "/listArticles/classid=2" + "&start="+ $rootScope.churchStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.churchnewslist == '')
          $rootScope.churchnewslist = response;
        else
          $rootScope.churchnewslist = response.concat($rootScope.churchnewslist);

        console.log($rootScope.churchnewslist);
        $rootScope.churchStartId=$rootScope.churchStartId+myConfig.fetchNum;

        console.log($rootScope.churchnewslist.length);

        if($rootScope.churchStartId > $rootScope.churchnewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.churchStartId = $rootScope.churchnewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.churchStartId = $rootScope.churchStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

