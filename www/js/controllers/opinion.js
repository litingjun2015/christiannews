/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('OpinionCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {

  $rootScope.opinionStartId = 0;
  $rootScope.opinionnewslist = '';

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listArticles/classid=8" + "&start="+ $rootScope.opinionStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.opinionnewslist == '')
          $rootScope.opinionnewslist = response;
        else
          $rootScope.opinionnewslist = response.concat($rootScope.opinionnewslist);

        console.log($rootScope.opinionnewslist);
        $rootScope.opinionStartId=$rootScope.opinionStartId+myConfig.fetchNum;

        console.log($rootScope.opinionnewslist.length);

        if($rootScope.opinionStartId > $rootScope.opinionnewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.opinionStartId = $rootScope.opinionnewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.opinionStartId = $rootScope.opinionStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

