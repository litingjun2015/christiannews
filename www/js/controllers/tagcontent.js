/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('TagcontentCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig, $stateParams) {

  console.log("$stateParams.tagId: " + $stateParams.tagId);

//  window.localStorage.clear();

  var item = window.localStorage.getItem($stateParams.tagId);
  if(item != null && item != 'null'){
    $rootScope.tagnewslist = JSON.parse(item);

  }
  else
    $rootScope.tagnewslist = '';

  var item = window.localStorage.getItem($stateParams.tagId*10000);
  if(item != null && item != 'null'){
    $rootScope.tagStartId = parseInt(item, 10);;

    console.log($rootScope.tagStartId);
  }
  else
    $rootScope.tagStartId = 0;


  $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
    // process 'item'
    console.log(item);
  });

  $scope.$on('$ionTreeList:LoadComplete', function(event, items) {
    // process 'items'
    console.log(items);
  });

  $scope.$watch('$viewContentLoaded', function() {
    $scope.doRefresh();
  });

  $rootScope.gosearch = function() {
    $state.go('tab.searchinput');
  };


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listArticles/classid=" + $stateParams.tagId + "&start="+ $rootScope.tagStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.tagnewslist == '')
          $rootScope.tagnewslist = response;
        else
          $rootScope.tagnewslist = response.concat($rootScope.tagnewslist);

        console.log($rootScope.tagnewslist);
        $rootScope.tagStartId=$rootScope.tagStartId+myConfig.fetchNum;

        console.log($rootScope.tagnewslist.length);

        if($rootScope.tagStartId > $rootScope.tagnewslist.length)
        {
          ToastService.showShortCenter('没有新内容了');
          $rootScope.tagStartId = $rootScope.tagnewslist.length;
        }

        window.localStorage.setItem($stateParams.tagId, JSON.stringify($rootScope.tagnewslist));
        window.localStorage.setItem($stateParams.tagId*10000, $rootScope.tagStartId.toString());

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.tagStartId = $rootScope.tagStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

