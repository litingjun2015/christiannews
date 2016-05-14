/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('TechCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {

  $rootScope.techStartId = 0;
  $rootScope.technewslist = '';

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listArticles/classid=6" + "&start="+ $rootScope.techStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.technewslist == '')
          $rootScope.technewslist = response;
        else
          $rootScope.technewslist = response.concat($rootScope.technewslist);

        console.log($rootScope.technewslist);
        $rootScope.techStartId=$rootScope.techStartId+myConfig.fetchNum;

        console.log($rootScope.technewslist.length);

        if($rootScope.techStartId > $rootScope.technewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.techStartId = $rootScope.technewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.techStartId = $rootScope.techStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

