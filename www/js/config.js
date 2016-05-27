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

     // product
     'AppID': 'wxbd05c4fc6e17966e',
     'AppSecret': '5c2fbf081e1d7fb33b0a7975f83d02a3',

     // test
     //'AppID': 'wx21ded7dba68708a8',
     //'AppSecret': '5eb67a03cd1c18e955caf21c03e55956',


     'view_balanceonly': false,
   }
 })());
