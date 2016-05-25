angular.module('christiannews.services')

  .factory('UserService', function($http, myConfig, $fileLogger){

/**
用户数据结构如下:
    created_at: 1444296121,
    email: null,
    id: "6hc8EPYpdsPnX7bbsXoCgWDwftBwOjaF",
    login: "admin",
    openid: "6hc8EPYpdsPnX7bbsXoCgWDwftBwOjaF",
    role: 10,
    status: 10,
    telephone: "14787823046",
    updated_at: 1451455761,
    username: "admin",
    wixinid: null,
**/
    var user = null; //null代表未登录
    var signupVerifyCode = undefined;//注册验证码
    var forgetVerifyCode = undefined;// 忘记密码验证码

    return{

      isUserLogin:function(){
        return this.getUser() !== null;
      },

      getUser:function(){
        if(user === null){
          var item = window.localStorage.getItem('user');
          if(item !== null){
            user = JSON.parse(item);
          }
        }
        return user;
      },

      logout:function(){
        window.localStorage.removeItem('user');
        user = null;
      },

      storeUser:function(userObject){
        user = userObject;
        window.localStorage.setItem('username',userObject.nickname);//默认记住用户名
        window.localStorage.setItem('user',JSON.stringify(userObject));
      },

      getRememberedUserName:function(){
        return window.localStorage.getItem('username');
      },

      oauth:function(username,password){

        var postData = 'grant_type=password'
          +'&client_id='+myConfig.client_id
          +'&client_secret='+myConfig.client_secret
          +'&username='+username
          +'&password='+password;

        $fileLogger.debug(myConfig.oauth2Url);

        //console.log(postData);
        $fileLogger.debug(postData);

        return $http({
          method: 'POST',
          url: myConfig.oauth2Url,
          data: postData,
          headers: myConfig.urlencoded,
          timeout: 3000,
          cache: false
        });

      },

      userInfo:function(token){
        return $http({
          method: 'GET',
          url: myConfig.userInfoUrl+"?access_token="+token
        });
      },

      getNamebyphone:function(phone){
        $fileLogger.debug(myConfig.getNameUrl+"?phone="+phone);
        return $http({
          method: 'GET',
          url: myConfig.getNameUrl+"?phone="+phone
        });
      },

      getIdbyphone:function(phone, token){
        var url = myConfig.getIdUrl+"?phone="+phone+"&access_token="+token;
        $fileLogger.debug(url);
        return $http({
          method: 'GET',
          url: url
        });
      },

      //用户认证后,即可使用client_credentials方式获取token,而不再使用oauth的password方式的token
      //由于token涉及到过期的问题,此处暂不进行本地缓存,未来应该进行处理,缓存期为token过期的时间
      fetchToken:function(){
        var postData = 'grant_type=client_credentials'
          + '&client_id=' + myConfig.client_id
          + '&client_secret=' + myConfig.client_secret;

        return $http({
          method: 'POST',
          url: myConfig.oauth2Url,
          data: postData,
          headers: myConfig.urlencoded,
          timeout: 3000,
          cache: false
        });
      },

      requestVerifyCode:function(phone, apiUrl){
        return  $http({
          method: 'POST',
          url: apiUrl,
          data: 'phone=' + phone,
          headers: myConfig.urlencoded
        })
      },

      signup:function(phone,pwd){
        return  $http({
          method: 'POST',
          url: myConfig.signupUrl,
          data: 'phone=' + phone + "&pwd="+pwd,
          headers: myConfig.urlencoded
        })
      },

      resetPwd:function(phone,pwd){
        return $http({
          method: 'POST',
          url: myConfig.resetPwdUrl,
          data: 'phone=' + phone + "&pwd="+pwd,
          headers: myConfig.urlencoded
        })
      },

      rename:function(token,openid,newName ){
        return $http({
          method: 'POST',
          url: myConfig.renameUrl+ '?access_token='+token,
          data: 'id='+ openid + '&username='+newName,
          headers: myConfig.urlencoded
        })
      },


      setSignupVerifyCode:function(code){
        signupVerifyCode = code;
      },
      getSignupVerifyCode:function(){
        return signupVerifyCode;
      },
      setForgetVerifyCode:function(code){
        forgetVerifyCode = code;
      },
      getForgetVerifyCode:function(){
        return forgetVerifyCode;
      },
      getMemberId:function(telephone){
        return $http({
          method: 'GET',
          url: myConfig.getsysURL+"/get-member?telephone="+telephone,
        });
      },
      getTaskid:function(token,openid){
        var url = myConfig.gettaskidUrl+"?access_token="+token+"&id="+openid;
        console.log(url);
        return $http({
          method: 'GET',
          url: url,
        });
      },

    }

});
