
App.controller('mapImageController', function ($scope,$compile, $http, $cookies, $cookieStore,$rootScope,$timeout, $state) {
//console.log(MY_CONSTANT.url);


    var lat;
    var lon;
    var marker;
    //var markernew;
    var map = null;
    $scope.MapAddress = {};

    var geocoder = geocoder = new google.maps.Geocoder();


    //==========================show service location ===========================//

    function getLatitudeLongitude(callback, address) {
        // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
        address = address || 'Ferrol, Galicia, Spain';
        // Initialize the Geocoder
        geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({
                'address': address
            }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    callback(results[0]);
                }
            });
        }
        // else{
        //    console.log($cookieStore.get('userLatitude'));
        //    lat = $cookieStore.get('userLatitude');
        //    lon = $cookieStore.get('userLongitude');
        //}
    }

    $scope.CPaddress = function(){
        var Searchaddress = document.getElementById('SearchAddress').value;
        getLatitudeLongitude(showResult, Searchaddress);

    };

    function showResult(result) {
        lat = result.geometry.location.lat();
        lon = result.geometry.location.lng();

        console.log(lat,lon);
        var latLong = new google.maps.LatLng(lat, lon);
        //markernew = new google.maps.Marker({
        //    position: latLong,
        //    map: map,
        //    scaledSize: new google.maps.Size(20, 20),
        //    draggable:true,
        //    title:"Drag me!",
        //    icon:"assets/images/pin-location.png"
        //})
        //markernew.setMap(map);
        //marker.setMap(null);
        marker.setPosition(latLong);
        //map.setZoom(11);
        map.setCenter(marker.getPosition());


    }

    $scope.ctrl = {};
    $scope.ctrl.isOpen = false;
    $scope.ctrl.selectedMode = 'md-scale';
    $scope.ctrl.selectedDirection = 'up';

    $scope.getAddress = function(){
        geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                $scope.MapAddress.address = results[0].formatted_address;
                //console.log(address);
            }
        });
    };




    $scope.showlocation = function() {
        // One-shot position request.
        navigator.geolocation.getCurrentPosition(callback);
    };
    $timeout(function(){
        $scope.showlocation();
    },10);


    var contentString,infowindow,htmlString,imagePagination,photoURL;
    var sendImageData = function(response){
        console.log(response);
    };

    function displayImages(data){
        console.log(data);
        angular.forEach(data.photos.photo,function(item,i){
            //console.log(item);
            lat = item.latitude;
            lon = item.longitude;
            photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';

            //Uses the Google Maps API to add an event listener that triggers the info window to open if a marker is clicked.

        });
        htmlString = '<div class="list-inline" onclick="sendImageData(data.photos.photo)">'+'<img src="' + photoURL+ '">'+'<br>'+data.photos.photo.length+'</div>';
        contentString = '<div id="content">' + htmlString + '<button onclick="somefunction()" id="map-go">'+'submit'+'</button>'+'</div>';
        //Create a new info window using the Google Maps API
        infowindow = new google.maps.InfoWindow({
            //Adds the content, which includes the html to display the image from Flickr, to the info window.
            //content: contentString
            content: ''
        });
        infowindow.setContent(contentString)

        //$("#map-go").click(function(){
        //    alert("The paragraph was clicked.");
        //});
        infowindow.open(map,marker);
        //var mapgo = document.getElementById('map-go');
        //mapgo.onclick = function(){
        //    alert("The paragraph was clicked.");
        //}


        //google.maps.event.addListener(marker, 'click', function(check) {
        //    console.log(check);
        //
        //});
    }

    //$scope.getPublicFlickrImages = function(lat,long){
    //    lat = lat.toString();
    //    long = long.toString();
    //    //var flickrImgUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=032f5b03ad9ebc8052c890a7a792da31&lat='+lat+'&lon='+long+'&format=json&nojsoncallback=1&auth_token=72157681779303612-06cba8846c13ef40&api_sig=a8ca75b9f9587478fb01e87eb8ba0de7';
    //    var flickrImgUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fab2114c4e792911e16e25f17490691e&lat='+lat+'&lon='+long+'&format=json&jsoncallback=?';
    //    $.getJSON(flickrImgUrl, displayImages);
    //
    //};

    $scope.genericData = {};
    function callback(position) {

        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat,lon);
        //$scope.service.lat = lat;
        //$scope.service.long = lon;
        //document.getElementById('longitude').innerHTML = lon;

        var latLong = new google.maps.LatLng(lat, lon);
        var latLongs = new google.maps.LatLng(30.4561, 76.1516);

        //var marker = new google.maps.Marker({
        //    position: latLong
        //});
        marker = new google.maps.Marker({
                position: latLong,
                map: map,
                scaledSize: new google.maps.Size(20, 20),
                draggable:true,
                title:"Drag me!",
                icon:"assets/images/pin-location.png"
            }
        );
        infowindow = new google.maps.InfoWindow({
            //Adds the content, which includes the html to display the image from Flickr, to the info window.
            //content: contentString
            content: ''
        });


        //============================== changing lat long on marker drag ========================== ///
        google.maps.event.addListener(marker, 'dragend', function (evt,results,status) {
            var self = marker;
            lat = evt.latLng.lat().toFixed(3);
            lon =  evt.latLng.lng().toFixed(3);
            console.log(google.maps.GeocoderStatus.OK);
            console.log(lat,lon);
            //============================== ends here =====================================//
            var flickrImgUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=fab2114c4e792911e16e25f17490691e&lat='+lat+'&lon='+lon+'&format=json&jsoncallback=?';
            $.getJSON(flickrImgUrl, function(data){
                $scope.genericData.valueData = data.photos.photo;
                photoURL = 'https://farm' + data.photos.photo[0].farm + '.static.flickr.com/' + data.photos.photo[0].server + '/' + data.photos.photo[0].id + '_' + data.photos.photo[0].secret + '_m.jpg';
                htmlString = '<div class="list-inline">'+'<img src="' + photoURL+ '">'+'<br>'+'</div>';
                contentString = '<div id="content" style="text-align: center;">' + htmlString + "<button ng-click='somefunction()' style='margin-top:10px;border-radius:30px;' class='btn btn-info btn-round btn-sm' id='map-go'>"+"View More "+(data.photos.photo.length-1)+" images"+"</button>"+"</div>";

                var compiled = $compile(contentString)($scope);
                infowindow.setContent(compiled[0]);
                infowindow.open(map,self);

            });
            //===================== getting address on marker drag =====================//

            infowindow.close();
            $scope.getAddress();
            //$scope.getPublicFlickrImages(lat,lon);

            //=============================== ends here ==============================//


        });
        $scope.somefunction = function(data){

            console.log($scope.genericData.valueData);
            $('#myModal').modal('show');
            //Lightbox.openModal($scope.genericData.valueData);
        };
        $scope.getAddress();
        //$scope.getPublicFlickrImages(lat,lon);
        //google.maps.event.addListener(marker, 'dragstart', function (evt) {
        //    document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
        //});

        marker.setMap(map);

        //map.setZoom(11);
        map.setCenter(marker.getPosition());

    }



    $(function(){
        // This code is not even almost production ready. It's 2am here, and it's a cheap proof-of-concept if anything.
        $(".img-modal-btn.right").on('click', function(e){
            e.preventDefault();
            cur = $(this).parent().find('img:visible()');
            next = cur.next('img');
            par = cur.parent();
            if (!next.length) { next = $(cur.parent().find("img").get(0)) }
            cur.addClass('hidden');
            next.removeClass('hidden');

            return false;
        });

        $(".img-modal-btn.left").on('click', function(e){
            e.preventDefault();
            cur = $(this).parent().find('img:visible()');
            next = cur.prev('img');
            par = cur.parent();
            children = cur.parent().find("img");
            if (!next.length) { next = $(children.get(children.length-1)) }
            cur.addClass('hidden');
            next.removeClass('hidden');

            return false;
        })

    });

//   =========

    function initMap() {
        var mapOptions = {
            center: new google.maps.LatLng(30.73, 76.77),
            zoom: 11,
            //draggable:true,
            styles:[
                {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": [
                        {
                            "hue": "#008eff"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "0"
                        },
                        {
                            "lightness": "0"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "saturation": "-60"
                        },
                        {
                            "lightness": "-20"
                        }
                    ]
                }
            ],
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        addYourLocationButton(map, marker);

        //var myoverlay = new google.maps.OverlayView();
        //myoverlay.draw = function () {
        //    this.getPanes().markerLayer.id='markerLayer';
        //};
        //myoverlay.setMap(map);
        //
        //$timeout(function(){
        //    $scope.providers();
        //},3000);
    }


    initMap()




    function addYourLocationButton(map)
    {

        var controlDiv = document.createElement('div');

        var firstChild = document.createElement('button');
        firstChild.style.backgroundColor = '#fff';
        firstChild.style.border = 'none';
        firstChild.style.outline = 'none';
        firstChild.style.width = '28px';
        firstChild.style.height = '28px';
        firstChild.style.borderRadius = '2px';
        firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
        firstChild.style.cursor = 'pointer';
        firstChild.style.marginRight = '10px';
        firstChild.style.padding = '0px';
        firstChild.title = 'Your Location';
        controlDiv.appendChild(firstChild);

        var secondChild = document.createElement('div');
        secondChild.style.margin = '5px';
        secondChild.style.width = '18px';
        secondChild.style.height = '18px';
        secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
        secondChild.style.backgroundSize = '180px 18px';
        secondChild.style.backgroundPosition = '0px 0px';
        secondChild.style.backgroundRepeat = 'no-repeat';
        secondChild.id = 'you_location_img';
        firstChild.appendChild(secondChild);

        google.maps.event.addListener(map, 'dragend', function() {
            $('#you_location_img').css('background-position', '0px 0px');
        });

        firstChild.addEventListener('click', function() {
            var imgX = '0';
            var animationInterval = setInterval(function(){
                if(imgX == '-18') imgX = '0';
                else imgX = '-18';
                $('#you_location_img').css('background-position', imgX+'px 0px');
            }, 500);
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    console.log(position);
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    marker.setPosition(latlng);

                    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            $scope.MapAddress.address = results[0].formatted_address;
                            //console.log(address);
                        }
                    });
                    map.setCenter(latlng);

                    map.setZoom(16);
                    clearInterval(animationInterval);
                    $('#you_location_img').css('background-position', '-144px 0px');
                });
                $scope.providers();
            }
            else{
                clearInterval(animationInterval);
                $('#you_location_img').css('background-position', '0px 0px');
            }

        });

        controlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
    }



});