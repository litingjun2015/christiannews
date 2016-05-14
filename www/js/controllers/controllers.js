angular.module('christiannews.controllers')

//.controller('HomeCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {
//
//  $rootScope.homeStartId = 0;
//  $rootScope.homenewslist = '';
//
//  $scope.$watch('$viewContentLoaded', function() {
//    $scope.doRefresh();
//
//  });
//
//
//  $scope.doRefresh = function() {
//
//    console.log('doRefresh');
//
//    var url="http://192.168.31.207:8081/listArticles/classid=1" + "&start="+ $rootScope.homeStartId + "&fetch=" + myConfig.fetchNum;
//    console.log(url);
//    $http.get(url)
//      .success(function (response)
//      {
//
//        if($rootScope.homenewslist == '')
//          $rootScope.homenewslist = response;
//        else
//          $rootScope.homenewslist = response.concat($rootScope.homenewslist);
//
//        console.log($rootScope.homenewslist);
//        $rootScope.homeStartId=$rootScope.homeStartId+myConfig.fetchNum;
//
//      }).error(function(response) {
//
//      ToastService.showShortCenter('获取数据失败');
//      $rootScope.homeStartId = $rootScope.homeStartId-myConfig.fetchNum;
//
//    });
//
//    $scope.$broadcast('scroll.refreshComplete');
//  };
//
//
//})

.controller('DashCtrl', function($scope) {})

//.controller('ChatsCtrl', function($scope, $rootScope, ToastService, $http, myConfig) {
//
//  $rootScope.homeStartId = 0;
//  $rootScope.homenewslist = '';
//
//
//  $scope.$watch('$viewContentLoaded', function() {
//    $scope.doRefresh();
//
//  });
//
//
//  $scope.doRefresh = function() {
//
//    console.log('doRefresh');
//
//    var url="http://192.168.31.207:8081/listArticles/classid=1" + "&start="+ $rootScope.homeStartId + "&fetch=" + myConfig.fetchNum;
//    console.log(url);
//    $http.get(url)
//      .success(function (response)
//      {
//        if($rootScope.homenewslist == '')
//          $rootScope.homenewslist = response;
//        else
//          $rootScope.homenewslist = response.concat($rootScope.homenewslist);
//
//        console.log($rootScope.homenewslist);
//        $rootScope.homeStartId=$rootScope.homeStartId+myConfig.fetchNum;
//
//      }).error(function(response) {
//
//      ToastService.showShortCenter('获取数据失败');
//      $rootScope.homeStartId = $rootScope.homeStartId-myConfig.fetchNum;
//
//    });
//
//    $scope.$broadcast('scroll.refreshComplete');
//  };
//
//})

.controller('NewsDetailCtrl', function($scope, $stateParams, Chats, $http, myConfig) {

  //$scope.origurl = "http://192.168.31.207:3000/article/" + $stateParams.newsId;
  //$scope.url = $sce.trustAsResourceUrl($scope.origurl);


  var url= myConfig.backend + "/article/" + $stateParams.newsId;
  console.log(url);
  $http.get(url)
    .success(function (response)
    {
      $scope.news = response;
      console.log($scope.news);

    }).error(function(response) {

    ToastService.showShortCenter('获取数据失败');

  });


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
