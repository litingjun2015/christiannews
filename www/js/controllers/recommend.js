/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('RecommendCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig, $stateParams, $ionicScrollDelegate, UtilityService) {

  console.log("recommendtag: " + "recommendtag");

  $scope.title = $stateParams.name;


  $scope.navClass = function(id) {

    //console.log("id: "+ id);
    //console.log("$stateParams.tagId: " + $stateParams.tagId);
    return $stateParams.tagId == id ? 'active':'';
  };

  $scope.goRecommend = function(tag) {
    var pos = $ionicScrollDelegate.$getByHandle('small').getScrollPosition();
    //console.log(pos);
    //console.log(pos.left);
    $state.go("tab.recommend");
  };

  $scope.goTagcontent = function(tag) {
    var pos = $ionicScrollDelegate.$getByHandle('small').getScrollPosition();
    //console.log(pos);
    //console.log(pos.left);
    $state.go("tab.tagcontent", { 'tagId':tag.id, 'name':tag.name, 'positionLeft': pos.left})
  };

//  window.localStorage.clear();

  $scope.$on('$ionTreeList:ItemClicked', function(event, item) {
    // process 'item'
    console.log(item);
  });

  $scope.$on('$ionTreeList:LoadComplete', function(event, items) {
    // process 'items'
    console.log(items);
  });

  $scope.loadDefault = function() {

    $rootScope.selectedtags = [{"name":"教会","id":2},{"name":"事工","id":3},{"name":"国际","id":4},{"name":"社会","id":5},{"name":"科技&财经","id":6},{"name":"文化","id":7},{"name":"观点","id":8}];
    window.localStorage.setItem('selecttags', JSON.stringify($rootScope.selectedtags));

  };

  $scope.Init = function() {



    var item = window.localStorage.getItem('selecttags');
    console.log(item);
    if(item != null && item != 'null' && item != 'undefined'){
      $rootScope.selectedtags = JSON.parse(item);
    }
    else
      $rootScope.selectedtags = [];

    //UtilityService.clearcache();

    var item = window.localStorage.getItem("recommendtag");
    if(item != null && item != 'null'){
      $rootScope.tagnewslist = JSON.parse(item);
    }
    else
      $rootScope.tagnewslist = '';

    var item = window.localStorage.getItem("tagStartId"+"recommendtag".toString());
    if(item != null && item != 'null'){
      $rootScope.tagStartId = parseInt(item, 10);
    }
    else
      $rootScope.tagStartId = 0;

  }

  $scope.checkUpdate = function() {

    var ret = false;

    var url = myConfig.backend + "/getTagArticleNum/tagid=" + $stateParams.tagId;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        console.log(response);

        var item = window.localStorage.getItem("ArticleNum"+$stateParams.tagId.toString());
        console.log(item);
        if(item != null && item != 'null'){
          $rootScope.tagArcticleNum = parseInt(item, 10);
        }
        else
          $rootScope.tagArcticleNum = 0;
        console.log("$rootScope.tagArcticleNum：" + $rootScope.tagArcticleNum);

        if(response != '' && response[0].count != $rootScope.tagArcticleNum)
        {
          var msg = '发现'+(response[0].count-$rootScope.tagArcticleNum)+'条更新';
          ToastService.showShortCenter(msg);
          $rootScope.tagArcticleNum = response[0].count;

          ret = true;
        }
        window.localStorage.setItem("ArticleNum"+$stateParams.tagId.toString(), $rootScope.tagArcticleNum.toString());



      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.tagStartId = $rootScope.tagStartId-myConfig.fetchNum;

    });

    return ret;
  }

  $scope.$watch('$viewContentLoaded', function() {

    //if( $scope.checkUpdate() )
    //{
    //  window.localStorage.setItem($stateParams.tagId, null);
    //  window.localStorage.setItem("tagStartId"+$stateParams.tagId.toString(), "0"); //tagStartId
    //  window.localStorage.setItem("ArticleNum"+$stateParams.tagId.toString(), "0");//tagArcticleNum
    //}

    $scope.Init();

    if($rootScope.selectedtags.length == 0)
      $scope.loadDefault();

    var left = 0;
    if($stateParams.positionLeft == undefined)
      left = 0;
    else
      left = $stateParams.positionLeft;
    $ionicScrollDelegate.$getByHandle('small').scrollTo(left,0,true);


    if($rootScope.tagnewslist.length == 0)
      $scope.doRefresh();
  });

  $rootScope.gosearch = function() {
    $state.go('tab.searchinput');
  };


  $scope.doRefresh = function() {

    var url = myConfig.backend + "/listLatestArticles/start="+ $rootScope.tagStartId + "&fetch=" + myConfig.fetchNum;
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

        //console.log($rootScope.tagnewslist.length);

        if($rootScope.tagStartId > $rootScope.tagnewslist.length)
        {
          //ToastService.showShortCenter('没有新内容了');
          $rootScope.tagStartId = $rootScope.tagnewslist.length;
        }

        window.localStorage.setItem("recommendtag", JSON.stringify($rootScope.tagnewslist));
        window.localStorage.setItem("tagStartId"+"recommendtag".toString(), $rootScope.tagStartId.toString());

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.tagStartId = $rootScope.tagStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

