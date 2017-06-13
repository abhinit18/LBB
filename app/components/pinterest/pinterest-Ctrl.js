/**
 * Created by angularpc on 06-06-2017.
 */

App.controller('pinterestController', function ($scope, $http, $cookies, $cookieStore,$rootScope,$timeout, $state) {
//console.log(MY_CONSTANT.url);

//    ============================= loading pinterest data ================== //

    $scope.loadPinterestData = function(){
        var pinterestUrl = '//api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
        $http({
            method: 'GET',
            url: pinterestUrl

        }).success(function(response){
            console.log(response);
            $scope.dataThumbnail = response.data;
        }).error(function(err){
            console.log(err);
        })
    };
    $scope.loadPinterestData();
});