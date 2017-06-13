
App.controller('WelcomeController', function ($scope, $http, $cookies, $cookieStore,$rootScope,$timeout, $state) {
//console.log(MY_CONSTANT.url);

    //
    //var vand = 'Token 58c9a5dbe2d373e10d5818494b9eaac695283311';
    //
    //$scope.Product = function(){
    //
    //    $http({
    //        method: 'GET',
    //        url: 'http://api.nightoutloud.com/api/v1/venue_state_slots/?data_type=historical',
    //        headers:{'authorization':vand}
    //
    //    }).success(function(data){
    //        console.log(data);
    //        $scope.tableData = data.results;
    //        $scope.dataTable = [];
    //        angular.forEach($scope.tableData,function(dataDetails){
    //            console.log(dataDetails);
    //            var d = {};
    //            d.people = dataDetails.count_total;
    //            d.venue = dataDetails.venue.display_name;
    //            d.male = dataDetails.count_total - dataDetails.count_females;
    //            d.female = dataDetails.count_females;
    //            d.fullness = dataDetails.fullness;
    //            d.vibe = dataDetails.vibe;
    //            d.music_source = dataDetails.music_source;
    //            d.music_type = dataDetails.music_type;
    //            if(dataDetails.venue.image == null){
    //                d.productImg = "assets/images/No_image.png";
    //            }else{
    //                d.productImg = dataDetails.venue.image;
    //            }
    //            $scope.dataTable.push(d);
    //        })
    //    }).error(function(data){
    //        console.log(data);
    //    });
    //}
    //$scope.Product();
    //
    //
    //
    //
    //$scope.ViewDetails  = function(data){
    //
    //    $scope.people = data.people;
    //    $scope.male = data.people - data.female;
    //    $scope.female = data.female;
    //    $scope.fullness = data.fullness;
    //    $scope.modalHeader = data.venue;
    //    $scope.modalImg = data.productImg;
    //    console.log(data);
    //    $('#myModal').modal('show');
    //}


});