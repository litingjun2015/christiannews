/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('CultureCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {

  $rootScope.cultureStartId = 0;
  $rootScope.culturenewslist = '';

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listArticles/classid=7" + "&start="+ $rootScope.cultureStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.culturenewslist == '')
          $rootScope.culturenewslist = response;
        else
          $rootScope.culturenewslist = response.concat($rootScope.culturenewslist);

        console.log($rootScope.culturenewslist);
        $rootScope.cultureStartId=$rootScope.cultureStartId+myConfig.fetchNum;

        console.log($rootScope.culturenewslist.length);

        if($rootScope.cultureStartId > $rootScope.culturenewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.cultureStartId = $rootScope.culturenewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.cultureStartId = $rootScope.cultureStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

