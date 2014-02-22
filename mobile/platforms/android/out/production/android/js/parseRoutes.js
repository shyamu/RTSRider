/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    console.log(localStorage.getItem("selectedStop"));
    var jsonData = JSON.parse(localStorage.getItem("selectedStop"));
    console.log(jsonData.name + " " + jsonData.stop_id);
    jQuery(".page-header").find("small").text("Stop: " + jsonData.name);

    var routesArray = jsonData.routes;
    getRouteObjects(routesArray);
});

function getRouteObjects(routesArray) {
    var URL = "http://api.transloc.com/1.2/routes.json?agencies=116";
    for(var i in routesArray) {
        console.log(routesArray[i]);
        $.getJSON(URL, function(jsonData) {
        var thisData = jsonData.data;
        var thisAgency = "116";
        for(var i in thisData.thisAgency) {
            var thisName = thisData[i].long_name;
            console.log(thisName);
            $(".list-group").append('<li class="list-group-item">' + thisName + '</li>');
        }
    });
    }
}


/*
navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var limitRadius = "1000" // in meters
    console.log("lat: " + lat + ", " + "long: " + long);
    var URL = "http://api.transloc.com/1.2/stops.json?agencies=116";
    var geoArea = "&geo_area=" + lat + "," + long + "|" + limitRadius;
    console.log(URL + geoArea);
    $.getJSON(URL + geoArea, function(jsonData) {
        for(var i in jsonData.data) {
            var thisLat = jsonData.data[i].location.lat;
            var thisLong = jsonData.data[i].location.lng;
            var thisName = jsonData.data[i].name;
            console.log(thisName);
            $(".list-group").append('<li class="list-group-item">' + thisName + '</li>');
        }
    });
});
*/



