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
        // get only first arrival time
        // TODO: error handling when there are no arrival times
        var arrivalTimeStr = thisData[0].arrival_at;
        console.log("arrivalStr: " + arrivalTimeStr);

        // get current time
        var currentTime = new Date();
        var hours = currentTime.getHours();
        var mins = currentTime.getMinutes();
        console.log("current: " + hours + ":" + mins);
        var arrivalTime = new Date(arrivalTimeStr);
        console.log("arrival: " + arrivalTime.getHours() + ":" + arrivalTime.getMinutes());

        // get time difference
        if(arrivalTime < currentTime) {
            arrivalTime.setDate(arrivalTime.getDate() + 1);
        }
        var diff = arrivalTime - currentTime; // diff is in milliseconds
        diff = diff/1000/60; // diff time is now in mins
        diff = diff.toFixed(0);
        console.log("time diff: " + diff + " mins");
      
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

