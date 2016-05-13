angular.module('christiannews.services')

.factory('ToastService', function($cordovaToast){

    return{

      showShortCenter:function(message){
        if(ionic.Platform.isAndroid() || ionic.Platform.isIOS() )
          $cordovaToast['showShortCenter'](message);
        else
          alert(message);
      },



    }
});
