/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

  .controller('NewsDetailCtrl', function($ionicScrollDelegate, UserService, $ionicPopup, UtilityService, $state, $scope, $ionicHistory, $stateParams, Chats, $http, myConfig, ToastService) {

    //$scope.origurl = "http://192.168.31.207:3000/article/" + $stateParams.newsId;
    //$scope.url = $sce.trustAsResourceUrl($scope.origurl);

    $scope.newsmeta = [];
    $scope.collected = false;
    $scope.user = UserService.getUser();



    $scope.scrollComments = function() {
      $ionicScrollDelegate.$getByHandle('comments').scrollBottom();
    }


    // Triggered on a button click, or some other target
    $scope.showPopup = function() {
      if(!UserService.isUserLogin())
      {
        ToastService.showShortCenter('发表评论请先登录');
        $state.go("tab.my");
        return;
      }

      $scope.data = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<label class="item item-input" style="height: 200px;"><textarea placeholder="带着爱和尊重回复" ng-model="data.comment"></textarea></label>',
        title: '',
        subTitle: '',
        scope: $scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>发布</b>',
            type: 'button-positive',
            onTap: function (e) {

              console.log($scope.data.comment.length);

              if($scope.data.comment.length>1000)
              {
                ToastService.showShortCenter('评论请少于1000字');
              }

              if (!$scope.data.comment) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.comment;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);

        $scope.user = UserService.getUser();

        var postData = 'article_id=' + $stateParams.newsId
          +'&user_id='+$scope.user.id
          +'&content='+res;


        var url = myConfig.backend + "/addComment/";
        console.log(url);
        $http({
          method: 'POST',
          url: url,
          data: postData,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
          timeout: 3000,
          cache: false
        })
          .success(function (response)
          {
            console.log(response);
            $state.reload("news-detail", { 'newsId': $stateParams.newsId});

          }).error(function(response) {

          ToastService.showShortCenter('获取数据失败');
          //$rootScope.tagStartId = $rootScope.tagStartId-myConfig.fetchNum;

        });

      });

      //$timeout(function() {
      //  myPopup.close(); //close the popup after 3 seconds for some reason
      //}, 3000);
    };

    $scope.$watch('$viewContentLoaded', function() {
      $scope.init();
    });

    $scope.init = function() {

      var url = myConfig.backend + "/getArticleMeta/id=" + $stateParams.newsId;
      console.log(url);
      $http.get(url)
        .success(function (response)
        {
          $scope.newsmeta = response[0];

          console.log($scope.newsmeta);

        }).error(function(response) {

        //ToastService.showShortCenter('获取数据失败');
        //$rootScope.tagStartId = $rootScope.tagStartId-myConfig.fetchNum;

      });


      var url= myConfig.backend + "/article/" + $stateParams.newsId;
      console.log(url);
      $http.get(url)
        .success(function (response)
        {
          $scope.news = response;
          //console.log($scope.news);

        }).error(function(response) {

        //ToastService.showShortCenter('获取数据失败');

      });


      var url= myConfig.backend + "/getTagnameFromNewsid/newsid=" + $stateParams.newsId;
      console.log(url);
      $http.get(url)
        .success(function (response)
        {
          $scope.tagname = response[0].category_name + ' - ' + response[0].name;
          console.log($scope.tagname);

        }).error(function(response) {

        //ToastService.showShortCenter('获取数据失败');

      });


      var url = myConfig.backend + "/getComments/newsid=" + $stateParams.newsId;
      console.log(url);
      $http.get(url)
        .success(function (response)
        {
          //$scope.comments = response[0];

          //console.log(response);
          $scope.comments = response;
          console.log($scope.comments);

        }).error(function(response) {

        //ToastService.showShortCenter('获取数据失败');
        //$rootScope.tagStartId = $rootScope.tagStartId-myConfig.fetchNum;

      });

    };

    $scope.wechatlogin = function() {

      var scope = "snsapi_userinfo",
        state = "_" + (+new Date());
      Wechat.auth(scope, state, function (response) {
        // you may use response.code to get the access token.
        alert(JSON.stringify(response));
        console.log(JSON.stringify(response));
      }, function (reason) {
        alert("Failed: " + reason);
      });

    }

    $scope.collect = function() {

      if($scope.collected)
      {
        ToastService.showShortCenter('您已经收藏过此文章');
        return;
      }

      //{
      //  label: "会话",
      //    value: 0
      //},
      //{
      //  label: "朋友圈",
      //    value: 1
      //},
      //{
      //  label: "收藏",
      //    value: 2
      //}

      var scene = {
        label: "收藏",
        value: 2
      };

      var params = {
        scene: scene.value
      };
      console.log(scene);

      params.message = {
        title: "[TEST]",
        description: "[TEST]Sending from test application",
        mediaTagName: "TEST-TAG-001",
        messageExt: "这是第三方带的测试字段",
        messageAction: "<action>dotalist</action>",
        media: {}
      };

      params.message.title = $scope.newsmeta.title;
      params.message.description = "";
      params.message.thumb = $scope.newsmeta.thumb;
      params.message.media.type = Wechat.Type.LINK;
      params.message.media.webpageUrl = myConfig.backend + "/webarticle/" + $stateParams.newsId;

      console.log(params);

      Wechat.share(params, function () {
        ToastService.showShortCenter("收藏成功");
        $scope.collected = true;
      }, function (reason) {
        ToastService.showShortCenter("Failed: " + reason);
      });

    }

    $scope.share = function() {


      //{
      //  label: "会话",
      //    value: 0
      //},
      //{
      //  label: "朋友圈",
      //    value: 1
      //},
      //{
      //  label: "收藏",
      //    value: 2
      //}

      var scene = {
        label: "朋友圈",
        value: 1
      };

      var params = {
        scene: scene.value
      };
      console.log(scene);

      params.message = {
        title: "[TEST]",
        description: "[TEST]Sending from test application",
        mediaTagName: "TEST-TAG-001",
        messageExt: "这是第三方带的测试字段",
        messageAction: "<action>dotalist</action>",
        media: {}
      };

      params.message.title = $scope.newsmeta.title;
      params.message.description = "";
      params.message.thumb = $scope.newsmeta.thumb;
      params.message.media.type = Wechat.Type.LINK;
      params.message.media.webpageUrl = myConfig.backend + "/webarticle/" + $stateParams.newsId;

      console.log(params);

      Wechat.share(params, function () {
        ToastService.showShortCenter("分享成功");
      }, function (reason) {
        ToastService.showShortCenter("Failed: " + reason);
      });




      // this is the complete list of currently supported params you can pass to the plugin (all optional)
      //var options = {
      //  message: 'share this', // not supported on some apps (Facebook, Instagram)
      //  subject: 'the subject', // fi. for email
      //  files: ['', ''], // an array of filenames either locally or remotely
      //  url: myConfig.backend + "/webarticle/" + $stateParams.newsId,
      //  chooserTitle: 'Pick an app' // Android only, you can override the default share sheet title
      //}
      //
      //var onSuccess = function(result) {
      //  console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      //  console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
      //}
      //
      //var onError = function(msg) {
      //  console.log("Sharing failed with message: " + msg);
      //}
      //
      ////window.plugins.socialsharing.share('share this', 'the subject', myConfig.backend + "/webarticle/" + $stateParams.newsId, null);
      ////window.plugins.socialsharing.share($scope.newsmeta.title, null, $scope.newsmeta.thumb, myConfig.backend + "/webarticle/" + $stateParams.newsId);
      //window.plugins.socialsharing.share($scope.newsmeta.title, null, null, "http://www.baidu.com");
    };

    $scope.myGoBack = function() {
      console.log("$ionicHistory.goBack()");
      //$state.go("tab.tagcontent", { 'tagId':tag.id, 'name':tag.name, 'positionLeft': pos.left})

      $state.go("tab.tagcontent", UtilityService.getTagPosition() );
    };




})
