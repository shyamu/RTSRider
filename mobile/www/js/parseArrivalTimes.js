/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
   // console.log(localStorage.getItem("selectedStop"));
   // console.log(localStorage.getItem("selectedRoute"));
    
    var jsonStopData = JSON.parse(localStorage.getItem("selectedStop"));
    var jsonRouteData = JSON.parse(localStorage.getItem("selectedRoute"));
    console.log(jsonRouteData.long_name + " " + jsonRouteData.route_id);
    console.log(jsonStopData.name + " " + jsonStopData.stop_id);
    jQuery(".page-header").find("small").text("Route: " + jsonRouteData.long_name + " Stop: " + jsonStopData.name);
    getArrivalTime(jsonRouteData,jsonStopData);
    
});


function getArrivalTime(route,stop) {
    var URL = "http://api.transloc.com/1.2/arrival-estimates.json?agencies=116";
    var routeId = route.route_id;
    var stopId = stop.stop_id;
    console.log("route: " + routeId + " stop: " + stopId);
    var URLAddition = "&routes=" + routeId + "&stops=" + stopId; 
    
    $.getJSON(URL + URLAddition, function(jsonData) {
        var thisData = jsonData.data[0].arrivals;
       
        for(var i in thisData) {
            var arrivalTime = thisData[i].arrival_at;
           // var thisId = thisData[i].route_id;
            console.log(arrivalTime);
            //console.log(thisId);
           
        } // for
/*
        $("a").on("click", function (event) {
            var param = $(this).attr("data-parm");
            var dataToStore = JSON.stringify(thisData[param]);
            //console.log("storing: " + dataToStore);
            localStorage.setItem("selectedRoute",dataToStore);
    	});
*/
	});
    

}

