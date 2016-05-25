angular.module('christiannews.services')

.factory('UtilityService', function($cordovaToast, $rootScope, $filter, myConfig, $http){

    var tagposition = [];
    return{

      clearcache:function(){
        for(var i=0;i<$rootScope.selectedtags.length;i++)
        {
          window.localStorage.setItem($rootScope.selectedtags[i].id, null);
          window.localStorage.setItem("tagStartId"+$rootScope.selectedtags[i].id.toString(), "0"); //tagStartId
          window.localStorage.setItem("ArticleNum"+$rootScope.selectedtags[i].id.toString(), "0");//tagArcticleNum
        }

        window.localStorage.setItem("recommendtag", null);
        window.localStorage.setItem("tagStartId"+"recommendtag", "0"); //tagStartId
      },

      setTagPosition:function(tag){

        tagposition = tag;

      },

      getTagPosition:function(){

        return tagposition;

      }


    }
});
