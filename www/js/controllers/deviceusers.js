/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

.controller('DeviceusersCtrl', function($scope, $rootScope, $state, ToastService, $http, myConfig, $stateParams, $ionicScrollDelegate, UtilityService) {

  console.log("deviceusers: " + "deviceusers");

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

    var item = window.localStorage.getItem("deviceusers");
    if(item != null && item != 'null'){
      $rootScope.deviceuserslist = JSON.parse(item);
    }
    else
      $rootScope.deviceuserslist = '';

    var item = window.localStorage.getItem("StartId"+"deviceusers".toString());
    if(item != null && item != 'null'){
      $rootScope.deviceusersStartId = parseInt(item, 10);
    }
    else
      $rootScope.deviceusersStartId = 0;

  }

  $scope.checkUpdate = function() {

    var url = myConfig.backend + "/getArticleNum";
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        console.log(response);

        var item = window.localStorage.getItem("ArticleNum"+"deviceusers".toString());
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
        window.localStorage.setItem("ArticleNum"+"deviceusers".toString(), $rootScope.tagArcticleNum.toString());



      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.StartId = $rootScope.StartId-myConfig.fetchNum;

    });
  }

  $scope.$watch('$viewContentLoaded', function() {

    //$scope.checkUpdate();

    setTimeout(function() {
      //$cordovaSplashscreen.hide();
      //console.log($scope.update_status);

      console.log("reset deviceusers ");
      window.localStorage.setItem("deviceusers", null);
      window.localStorage.setItem("StartId"+"deviceusers", "0"); //StartId
      //window.localStorage.setItem("ArticleNum"+$stateParams.tagId.toString(), "0");//tagArcticleNum

      $scope.Init();

      if($rootScope.selectedtags.length == 0)
        $scope.loadDefault();

      var left = 0;
      if($stateParams.positionLeft == undefined)
        left = 0;
      else
        left = $stateParams.positionLeft;
      $ionicScrollDelegate.$getByHandle('small').scrollTo(left,0,true);


      if($rootScope.deviceuserslist.length == 0)
        $scope.doRefresh();


    }, 500);
  });

  $rootScope.gosearch = function() {
    $state.go('tab.searchinput');
  };


  $scope.doRefresh = function() {

    console.log("---------------- cordova-hot-code-push test js updates 1.8");

    var url = myConfig.backend + "/listDeviceUsers/start="+ $rootScope.deviceusersStartId + "&fetch=" + myConfig.fetchNum;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        if($rootScope.deviceuserslist == '')
          $rootScope.deviceuserslist = response;
        else
          $rootScope.deviceuserslist = response.concat($rootScope.deviceuserslist);

        console.log($rootScope.deviceuserslist);
        $rootScope.deviceusersStartId=$rootScope.deviceusersStartId+myConfig.fetchNum;

        //console.log($rootScope.deviceuserslist.length);

        if($rootScope.deviceusersStartId > $rootScope.deviceuserslist.length)
        {
          //ToastService.showShortCenter('没有新内容了');
          $rootScope.deviceusersStartId = $rootScope.deviceuserslist.length;
        }

        window.localStorage.setItem("deviceusers", JSON.stringify($rootScope.deviceuserslist));
        window.localStorage.setItem("StartId"+"deviceusers".toString(), $rootScope.deviceusersStartId.toString());

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');
      //$rootScope.deviceusersStartId = $rootScope.deviceusersStartId-myConfig.fetchNum;

    });

    $scope.$broadcast('scroll.refreshComplete');
  };


})

