/**
 * Created by litingjun on 16-5-14.
 */

angular.module('christiannews.controllers')

  .controller('NewsDetailCtrl', function($scope, $stateParams, Chats, $http, myConfig, ToastService) {

    //$scope.origurl = "http://192.168.31.207:3000/article/" + $stateParams.newsId;
    //$scope.url = $sce.trustAsResourceUrl($scope.origurl);


    var url= myConfig.backend + "/article/" + $stateParams.newsId;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        $scope.news = response;
        console.log($scope.news);

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');

    });


    var url= myConfig.backend + "/getTagnameFromNewsid/newsid=" + $stateParams.newsId;
    console.log(url);
    $http.get(url)
      .success(function (response)
      {
        $scope.tagname = response[0].category_name + ' - ' + response[0].name;
        console.log($scope.tagname);

      }).error(function(response) {

      ToastService.showShortCenter('获取数据失败');

    });


})
