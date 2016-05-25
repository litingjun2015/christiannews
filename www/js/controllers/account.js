angular.module('christiannews.controllers')

.controller('AccountCtrl',  function($window,$scope,$state,$ionicHistory, UserService , ToastService, $cordovaAppVersion, $ionicPlatform, $cordovaEmailComposer, $fileLogger, $sce, $ionicActionSheet, $timeout, $http, $cordovaFileTransfer, $cordovaFile, $fileLogger, UtilityService) {

    $scope.user = UserService.getUser();
    $scope.editusername = $scope.user.username;

    $scope.version = null;
    $scope.url = '';

    $scope.info = [];

    $scope.isandroid = ionic.Platform.isAndroid();

    //$scope.origurl = myConfig.backend_pay + "/backend/web/v1/fixqrcode/getqrcode"
    //  +"?id="+$scope.user.id+"&access_token="+PaymentService.getToken();
    //$scope.url = $sce.trustAsResourceUrl($scope.origurl);
    //console.log($scope.origurl);

    $scope.goFixQrcode = function(){

      PaymentService.getFixqrcode($scope.user.selectedtaskid, PaymentService.getToken()).then(function (result) {
        console.log("getFixqrcode SUCCESS: ", result);

        PaymentService.setFixqrcodeurl(result.data.src);
        console.log(PaymentService.getFixqrcodeurl());

        $state.go('tab.index.my.fixqrcode');
      }, function (err) {
        console.log("ERROR: " + JSON.stringify(err));

        if(err.data.message=="There was an error at the server."){
          ToastService.showShortCenter('请联系管理员创建支付任务.');
        }else
          ToastService.showShortCenter('网络异常！请稍后重试.');
      }, function (progress) {
      })
    };

    $scope.share=function()
    {
      window.plugins.socialsharing.share(null, null, $scope.url, null);
    }

    $scope.download=function()
    {

      if (ionic.Platform.isIOS()) {
        var targetPath = cordova.file.documentsDirectory + "Qrcode.jpg";
      }
      if (ionic.Platform.isAndroid()) {
        var targetPath = cordova.file.externalDataDirectory + "Qrcode.jpg";
      }
      var trustHosts = true;
      var options = {};

      console.log(targetPath);

      $cordovaFileTransfer.download($scope.url, targetPath, options, trustHosts)
        .then(function(result) {
          // Success!
          ToastService.showShortCenter("图片已保存至"+targetPath);

        }, function(err) {
          // Error
          console.log(JSON.stringify(err));

          ToastService.showShortCenter('网络异常！请稍后重试.');

        }, function (progress) {
          $timeout(function () {
            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
          });
        });


    }


    $scope.onHold = function(){
      // Show the action sheet
      var hideSheet = $ionicActionSheet.show({
        buttons: [
          { text: '发送给朋友' },
          { text: '保存到手机' }
        ],
        buttonClicked: function(index) {

          switch (index){
            case 0:
              $scope.share();
              break;
            case 1:
              $scope.download();
              break;
          }
          return true;
        }
      });

      // For example's sake, hide the sheet after two seconds
      $timeout(function() {
        hideSheet();
      }, 5000);
    }

    $scope.checkUpdate = function(){

      window.localStorage.setItem('versionList', null);
      $state.go('tab.index');

    }

    $scope.myclearCache = function(){

      $window.location.reload(true);

      $state.go('tab.index');

    }



    $scope.sendEmail = function(){

      $fileLogger.getLogfile().then(function(l) {
        console.log('Logfile content');
        console.log(l);

        $fileLogger.checkFile().then(function(d) {
          console.log('Logfile data');
          console.log(JSON.stringify(d));

          //console.log(d.localURL);

          // https://www.thepolyglotdeveloper.com/2014/08/send-email-android-ios-ionicframework/
          if(window.plugins && window.plugins.emailComposer) {
            window.plugins.emailComposer.showEmailComposerWithCallback(function(result) {
                console.log("Response -> " + result);
              },
              "Debug log for your App", // Subject
              l,                      // Body
              ["tingjun.li@gmail.com"],    // To
              null,                    // CC
              null,                    // BCC
              false,                   // isHTML
              d.localURL,                    // Attachments
              null);                   // Attachment Data
          }

        });

      });
    }

    if(ionic.Platform.isAndroid() || ionic.Platform.isIOS() ){
      $ionicPlatform.ready(function() {
        $cordovaAppVersion.getVersionNumber().then(function (version) {
          $scope.version = version;
        });
      });
    }

    $scope.logout = function(){
      UserService.logout();
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();

      if(ionic.Platform.isAndroid() || ionic.Platform.isIOS() )
      {
        var tags = [];
        var alias;
        jpushService.setTagsWithAlias(tags, alias);
      }

      $fileLogger.deleteLogfile().then(function() {
        console.log('Logfile deleted');
      });

      $state.go('login');

      //if (ionic.Platform.isAndroid())
      //  $window.location.reload(true);
    }


    $scope.resetpassword = function(user) {

      if(user.password != user.passwordagain){
        ToastService.showShortCenter('两次输入密码不一致');
        return;
      }

      if(user.password.length < 6){
        ToastService.showShortCenter('密码过于简单,密码长度需大于等于6位');
        return;
      }

      //console.log($scope.user);
      //console.log(user.telephone);
      //console.log(user.username);

      // check oldpassword
      //先认证 => 取用户信息 => 存用户信息到本地 => 跳转页面,没必要使用$q库
      UserService.oauth(user.username,user.oldpassword).success(function(data,status,headers,config) {
        //console.log("oauth success info:",data, status,headers,config);
        $fileLogger.debug("oauth success info: " + JSON.stringify(data));


        UserService.resetPwd(user.telephone,user.password).success(function(data,status,headers,config) {
          // console.log("signup success info:", data, status, headers, config);
          $scope.cancelTimer = true;

          ToastService.showShortCenter('密码修改成功');
          $state.go('tab.index.my');

        }).error(function(data,status,headers,config) {
          //console.log("signup error info:",data, status,headers,config);
          ToastService.showShortCenter('网络异常！请稍后重试.');
        });

      }).error(function(data,status,headers,config) {
        console.log("oauth error info:",JSON.stringify(data), status,headers,config);
        $fileLogger.debug("oauth error info: " + JSON.stringify(data));

        if(status === 401) {
          ToastService.showShortCenter('请输入正确的原始密码');
          $fileLogger.debug("请输入正确的原始密码");
        }
        else {
          ToastService.showShortCenter('网络异常！请稍后重试.');
          $fileLogger.debug("网络异常！请稍后重试.");
        }
      });


    };

    $scope.goeditpassword = function(){
      $state.go('tab.index.my.passwordedit');
    };

    $scope.goeditaccount = function(){
      $state.go('tab.index.my.accountedit');
    };

    $scope.saveTask = function(){

      $scope.user.selectedtaskid = $scope.user.tasksel.task_id;
      $scope.user.selectedtaskbody = $scope.user.tasksel.body;

      UserService.storeUser($scope.user);
      console.log(UserService.getUser());

      $state.go('tab.index.my');
    };




    $scope.editaccount = function(edittelephone,editusername){

      UserService.fetchToken().success(function(data,status,headers,config) {
        //console.log("fetchToken success info:",data, status,headers,config);

        UserService.rename(data.access_token,$scope.user.openid,editusername).success(function(data,status,headers,config) {
          //console.log("rename success info:", data, status, headers, config);

          if(data.exitStatus == '404, Reason: 该用户名已被占用')
            ToastService.showShortCenter('该用户名已被占用');
          else
          {
            ToastService.showShortCenter('用户名更新成功');

            $scope.user.username = editusername;
            UserService.storeUser($scope.user);

            $state.go('tab.index.my');
          }
        }).error(function(data,status,headers,config) {
          //console.log("rename error info:",data, status,headers,config);
          ToastService.showShortCenter('网络异常！请稍后重试.');
        });
      }).error(function(data,status,headers,config) {
        //console.log("fetchToken error info:",data, status,headers,config);
        ToastService.showShortCenter('网络异常！请稍后重试.');
      });

    }
  });
