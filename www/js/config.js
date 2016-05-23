angular.module('christiannews')
 .constant('myConfig', (function () {
   //var backend = 'http://127.0.0.1:3000';
   //var backend = 'http://192.168.31.207:3000';

   //office
   //var backend = 'http://192.168.31.194:3000';

   var backend = 'http://www.duangwifi.cn:3000';

   //var backend_bizapp = '';
   var market = 'http://marketing.duanglink.com/backend/web';
   return {

    'backend': backend,

     'fetchNum': 8,

     // bizapp / duangwifi
     'client_id': 'EUyhtH5eKgXlJvAd-p3SH3yGwJHMGR2i',
     'client_secret': 'xNOaiMYndFMmver8qkVzn5Wn2T9eZMEc',

     'view_balanceonly': false,
   }
 })());
