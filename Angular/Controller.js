//create angular module
var app = angular.module('app', ['gm']);

//app controller
app.controller('controller', ['$scope', function ($scope) {
   var lang, ltd;

  	//update map on change of search location
	var updateMapOtions = function(ltd, lang){
		var mapOptions = {
		      zoom: 15,
		      center: new google.maps.LatLng(ltd,lang),
		      mapTypeId: google.maps.MapTypeId.TERRAIN
		}

		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		setMarker(ltd, lang);
	};
	
	//set the marker to default/searched location
	var setMarker = function(ltd, lang){
		 var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(ltd, lang),
            title: "current position"
        });
        
        $scope.markers.push(marker);
	};

	//get the current location of the user
 	$scope.getLocation = function(){
 		var options = {
                enableHighAccuracy: true
            };
 		 navigator.geolocation.getCurrentPosition(function(pos) {
            $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            lang=pos.coords.longitude;
            ltd = pos.coords.latitude;
            updateMapOtions(ltd, lang);
            setMarker(ltd, lang);
        }, 
        function(error) {                    
            alert('Unable to get location: ' + error.message);
        }, options);
	};

   //capture the inputs of the search box
   $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
      var location = $scope.autocomplete.getPlace().geometry.location;
      ltd = location.lat();
      lang = location.lng();
      updateMapOtions(ltd, lang);
  	});
 	 
 	$scope.getLocation();

}]);