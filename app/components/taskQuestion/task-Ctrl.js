/**
 * Created by angularpc on 12-06-2017.
 */
/**
 * Created by angularpc on 06-06-2017.
 */

App.controller('taskController', function ($scope, $http, $cookies, $cookieStore,$rootScope,$timeout, $state) {
//console.log(MY_CONSTANT.url);

//    ============================= loading pinterest data ================== //
    var pinterestUrl = '//api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
    var loadData;
    if(localStorage.getItem('autocomplete')==null){
        $http({
            method: 'GET',
            url: pinterestUrl

        }).success(function(response){
            localStorage.setItem('autocomplete', response.meta.msg);
        }).error(function(err){
            console.log(err);
        });

        loadData = localStorage.getItem('autocomplete');
    }else{
        loadData = localStorage.getItem('autocomplete');
    }
    alert(loadData) // says undefined
});