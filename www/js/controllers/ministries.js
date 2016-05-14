/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('MinistriesCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {

  $rootScope.ministriesStartId = 0;
  $rootScope.ministriesnewslist = '';

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listArticles/classid=3" + "&start="+ $rootScope.ministriesStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.ministriesnewslist == '')
          $rootScope.ministriesnewslist = response;
        else
          $rootScope.ministriesnewslist = response.concat($rootScope.ministriesnewslist);

        console.log($rootScope.ministriesnewslist);
        $rootScope.ministriesStartId=$rootScope.ministriesStartId+myConfig.fetchNum;

        console.log($rootScope.ministriesnewslist.length);

        if($rootScope.ministriesStartId > $rootScope.ministriesnewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.ministriesStartId = $rootScope.ministriesnewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.ministriesStartId = $rootScope.ministriesStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

