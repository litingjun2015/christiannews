angular.module('christiannews.controllers')

.controller('HomeCtrl', function($scope, $rootScope, ToastService, $http) {

  $rootScope.getAlertStartId = 0;
  $rootScope.fetchNum = 8;
  $rootScope.homenewslist = '';


  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();

  });


  $scope.doRefresh = function() {

    console.log('doRefresh');

    var url="http://192.168.31.207:8081/listArticles/classid=1" + "&start="+ $rootScope.getAlertStartId + "&fetch=" + $rootScope.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {

        if($rootScope.homenewslist == '')
          $rootScope.homenewslist = response;
        else
          $rootScope.homenewslist = response.concat($rootScope.homenewslist);

        console.log($rootScope.homenewslist);
        $rootScope.getAlertStartId=$rootScope.getAlertStartId+$rootScope.fetchNum;

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      $rootScope.getAlertStartId = $rootScope.getAlertStartId-$rootScope.fetchNum;

    });


    //    $http.get('/new-items')
    //     .success(function(newItems) {
    //       $scope.items = newItems;
    //     })
    //     .finally(function() {
    //       // Stop the ion-refresher from spinning
    //       $scope.$broadcast('scroll.refreshComplete');
    //     });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $rootScope, ToastService, $http) {

  $rootScope.getAlertStartId = 0;
  $rootScope.fetchNum = 8;
  $rootScope.homenewslist = '';


  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();

  });


  $scope.doRefresh = function() {

    console.log('doRefresh');

    var url="http://192.168.31.207:8081/listArticles/classid=1" + "&start="+ $rootScope.getAlertStartId + "&fetch=" + $rootScope.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {

        if($rootScope.homenewslist == '')
          $rootScope.homenewslist = response;
        else
          $rootScope.homenewslist = response.concat($rootScope.homenewslist);

        console.log($rootScope.homenewslist);
        $rootScope.getAlertStartId=$rootScope.getAlertStartId+$rootScope.fetchNum;

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      $rootScope.getAlertStartId = $rootScope.getAlertStartId-$rootScope.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $http) {

  //$scope.origurl = "http://192.168.31.207:3000/article/" + $stateParams.newsId;
  //$scope.url = $sce.trustAsResourceUrl($scope.origurl);


  var url="http://192.168.31.207:8081/article/" + $stateParams.newsId;
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
