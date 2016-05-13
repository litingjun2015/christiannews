angular.module('christiannews.controllers')

.controller('HomeCtrl', function($scope, $rootScope, ToastService, $http) {

  $rootScope.getAlertStartId = 0;
  $rootScope.homenewslist = '';

  $scope.doRefresh = function() {

    console.log('doRefresh');

    var url="http://127.0.0.1:8081/listArticles/classid=1" + "&start="+ $rootScope.getAlertStartId + "&fetch=5";
    console.log(url);
    $http.get(url)
      .success(function (response)
      {

        if($rootScope.homenewslist == '')
          $rootScope.homenewslist = response;
        else
          $rootScope.homenewslist = response.concat($rootScope.homenewslist);

        console.log($rootScope.homenewslist);
        $rootScope.getAlertStartId=$rootScope.getAlertStartId+5;

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      $rootScope.getAlertStartId = $rootScope.getAlertStartId-10;

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

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
