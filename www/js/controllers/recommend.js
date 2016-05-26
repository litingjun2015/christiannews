/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('RecommendCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig, $stateParams, $ionicScrollDelegate, UtilityService) {

  console.log("recommendtag: " + "recommendtag");

  $scope.title = $stateParams.name;
  $scope.update_status = false;


  $scope.goArticle = function(id) {

    console.log(UtilityService.getTagPosition());
    $state.go("news-detail", { 'newsId':id})
  };

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
    UtilityService.setTagPosition( { 'tagId':tag.id, 'name':tag.name, 'positionLeft': pos.left} );
    console.log(UtilityService.getTagPosition());
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
      $rootScope.recommendnewslist = JSON.parse(item);
    }
    else
      $rootScope.recommendnewslist = '';

    var item = window.localStorage.getItem("tagStartId"+"recommendtag".toString());
    if(item != null && item != 'null'){
      $rootScope.recommendStartId = parseInt(item, 10);
    }
    else
      $rootScope.recommendStartId = 0;

  }

  $scope.checkUpdate = function() {

    var url = myConfig.backend + "/getArticleNum";
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        console.log(response);

        var item = window.localStorage.getItem("ArticleNum"+"recommendtag".toString());
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

          $scope.update_status = true;
        }
        window.localStorage.setItem("ArticleNum"+"recommendtag".toString(), $rootScope.tagArcticleNum.toString());



      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.tagStartId = $rootScope.tagStartId-myConfig.fetchNum;

    });
  }

  $scope.$watch('$viewContentLoaded', function() {

    $scope.checkUpdate();

    setTimeout(function() {
      //$cordovaSplashscreen.hide();
      //console.log($scope.update_status);

      if( $scope.update_status )
      {
        console.log("reset recommendtag ");
        window.localStorage.setItem("recommendtag", null);
        window.localStorage.setItem("tagStartId"+"recommendtag", "0"); //tagStartId
        //window.localStorage.setItem("ArticleNum"+$stateParams.tagId.toString(), "0");//tagArcticleNum
      }

      $scope.Init();

      if($rootScope.selectedtags.length == 0)
        $scope.loadDefault();

      var left = 0;
      if($stateParams.positionLeft == undefined)
        left = 0;
      else
        left = $stateParams.positionLeft;
      $ionicScrollDelegate.$getByHandle('small').scrollTo(left,0,true);


      if($rootScope.recommendnewslist.length == 0)
        $scope.doRefresh();


    }, 500);
  });

  $rootScope.gosearch = function() {
    $state.go('tab.searchinput');
  };


  $scope.doRefresh = function() {

    console.log("---------------- cordova-hot-code-push test js updates 1.7");

    var url = myConfig.backend + "/listLatestArticles/start="+ $rootScope.recommendStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.recommendnewslist == '')
          $rootScope.recommendnewslist = response;
        else
          $rootScope.recommendnewslist = response.concat($rootScope.recommendnewslist);

        console.log($rootScope.recommendnewslist);
        $rootScope.recommendStartId=$rootScope.recommendStartId+myConfig.fetchNum;

        //console.log($rootScope.recommendnewslist.length);

        if($rootScope.recommendStartId > $rootScope.recommendnewslist.length)
        {
          //ToastService.showShortCenter('没有新内容了');
          $rootScope.recommendStartId = $rootScope.recommendnewslist.length;
        }

        window.localStorage.setItem("recommendtag", JSON.stringify($rootScope.recommendnewslist));
        window.localStorage.setItem("tagStartId"+"recommendtag".toString(), $rootScope.recommendStartId.toString());

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.recommendStartId = $rootScope.recommendStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

