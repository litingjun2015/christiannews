angular.module('christiannews')
 .constant('myConfig', (function () {
   var backend = 'http://open.duanglink.com';
   var backend_pay = 'http://www.duanglink.com/pay';
   var backend_bizapp = 'http://www.duangwifi.cn/bizapp/v2-phone/www/';
   //var backend_bizapp = 'http://192.168.31.193/bizapp/v2-phone/www/';
   //var backend_bizapp = '';
   var market = 'http://marketing.duanglink.com/backend/web';
   return {

    'backend_pay': backend_pay,

     'fetchNum': 8,

     // bizapp / duangwifi
     'client_id': 'EUyhtH5eKgXlJvAd-p3SH3yGwJHMGR2i',
     'client_secret': 'xNOaiMYndFMmver8qkVzn5Wn2T9eZMEc',

     'view_balanceonly': false,
   }
 })());
