angular.module('christiannews.services')

.factory('UtilityService', function($cordovaToast, $rootScope, $filter, myConfig, $http){

    return{

      clearcache:function(){
        for(var i=0;i<$rootScope.selectedtags.length;i++)
        {
          window.localStorage.setItem($rootScope.selectedtags[i].id, null);
          window.localStorage.setItem("tagStartId"+$rootScope.selectedtags[i].id.toString(), "0"); //tagStartId
          window.localStorage.setItem("ArticleNum"+$rootScope.selectedtags[i].id.toString(), "0");//tagArcticleNum
        }
      },


    }
});
