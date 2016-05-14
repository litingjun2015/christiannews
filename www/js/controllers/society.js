/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('SocietyCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {

  $rootScope.societyStartId = 0;
  $rootScope.societynewslist = '';

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listArticles/classid=5" + "&start="+ $rootScope.societyStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.societynewslist == '')
          $rootScope.societynewslist = response;
        else
          $rootScope.societynewslist = response.concat($rootScope.societynewslist);

        console.log($rootScope.societynewslist);
        $rootScope.societyStartId=$rootScope.societyStartId+myConfig.fetchNum;

        console.log($rootScope.societynewslist.length);

        if($rootScope.societyStartId > $rootScope.societynewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.societyStartId = $rootScope.societynewslist.length;
        }

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.societyStartId = $rootScope.societyStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

