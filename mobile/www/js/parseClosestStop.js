/*jslint browser: true*/
/*global $, jQuery, alert*/


navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var limitRadius = "100" // in meters
    console.log("lat: " + lat + ", " + "long: " + long);
    var URL = "http://api.transloc.com/1.2/stops.json?agencies=116";
    var geoArea = "&geo_area=" + lat + "," + long + "|" + limitRadius;
    console.log(URL + geoArea);
    
    $.getJSON(URL + geoArea, function(jsonData) {
        for (var i in jsonData.data) {
            var thisData = jsonData.data[i];
            //var thisLat = thisData.location.lat;
            //var thisLong = thisData.location.lng;
            var thisName = thisData.name;
            var thisStopId = thisData.stop_id;
            console.log(thisName);
            $(".list-group").append('<li class="list-group-item"><a data-parm="'+ i + '" href="./selectRoute.html">' + thisName + '</li>');
            
        } // end of for loop
        
        $("a").on("click", function (event) {
            var param = $(this).attr("data-parm");
            var dataToStore = JSON.stringify(jsonData.data[param]);
            console.log("storing: " + dataToStore);
            localStorage.setItem("selectedStop",dataToStore);
        });
        
    });
});


