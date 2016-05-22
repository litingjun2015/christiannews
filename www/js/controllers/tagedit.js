/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('TageditCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig, $ionicHistory, $window) {

  $scope.myGoBack = function() {
    console.log("$ionicHistory.goBack()");
    $state.go("tab.home");
  };

  $scope.goEditmytag = function() {
    $state.go("mytagedit");
  };

  $scope.goEdittag = function() {
    window.localStorage.setItem('selecttags', JSON.stringify($rootScope.selectedtags));
    $state.go("tagedit");
  };

  $scope.data = {
    showDelete: false
  };

  $scope.edit = function(item) {
    alert('Edit Item: ' + item.id);
  };
  $scope.share = function(item) {
    alert('Share Item: ' + item.id);
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $rootScope.selectedtags.splice(fromIndex, 1);
    $rootScope.selectedtags.splice(toIndex, 0, item);
  };

  $scope.onItemDelete = function(item) {
    $rootScope.selectedtags.splice($rootScope.selectedtags.indexOf(item), 1);
  };

  $scope.items = [
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 }
  ];

  ////////////////////////////////////////////////////////////

  function chunk(arr, size) {
    var newArr = [];
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }

  $scope.tasks = [];

  var item = window.localStorage.getItem('selecttags');
  console.log(item);
  if(item != null && item != 'null' && item != 'undefined'){
    $rootScope.selectedtags = JSON.parse(item);

  }
  else
    $rootScope.selectedtags = [];


  $scope.recommendtags = [];

  $scope.loadDefault = function() {

    $rootScope.selectedtags = [{"name":"教会","id":2},{"name":"事工","id":3},{"name":"国际","id":4},{"name":"社会","id":5},{"name":"科技&财经","id":6},{"name":"文化","id":7},{"name":"观点","id":8}];
    window.localStorage.setItem('selecttags', JSON.stringify($rootScope.selectedtags));

  };

  $scope.addTag = function(tag) {

    console.log(tag);

    $rootScope.selectedtags.push(tag);
    window.localStorage.setItem('selecttags', JSON.stringify($rootScope.selectedtags));

    $state.go("tagedit", null, {reload: true});
    //$window.location.reload();
  }

  $scope.isTagexist = function(tagid) {

    for(var i=0; i<$rootScope.selectedtags.length; i++)
    {
      if(tagid == $rootScope.selectedtags[i].id)
        return true;
    }

    return false;
  }

  $scope.loadRecommentTag = function() {
    var url = myConfig.backend + "/taglistwithoutcategoryname";
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        for(var i=0;i<response.length;i++)
        {
          var tag = response[i];
          if( !$scope.isTagexist(response[i].id) )
            $scope.recommendtags.push(tag);
        }

        $scope.chunkedDatarecommendtags = chunk($scope.recommendtags, 4);

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.homeStartId = $rootScope.homeStartId-myConfig.fetchNum;

    });
  }


  $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
    // process 'item'
    console.log(item);

    if(item.depth != 1)
      $state.go("tagcontent", { 'tagId':item.id, 'name':item.name })

  });

  $scope.$on('$ionTreeList:LoadComplete', function(event, items) {
    // process 'items'
    console.log(items);
  });

  $scope.$watch('$viewContentLoaded', function() {
    console.log($rootScope.selectedtags);

    if($rootScope.selectedtags.length == 0)
      $scope.loadDefault();

    $scope.chunkedData = chunk($rootScope.selectedtags, 4);
    $scope.loadRecommentTag();
  });

  $rootScope.gosearch = function() {
    $state.go('tab.searchinput');
  };


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/taglist";
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        $scope.tasks = response;

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.homeStartId = $rootScope.homeStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

