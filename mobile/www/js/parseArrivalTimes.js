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

        //set arrival time in html
        $(".time-mins").text(diff);

        $(".board-bus").on("click", function (event) {
            //UNCOMMENT LATERif(diff > 1) {
           //UNCOMMENT LATER     console.log("bus hasn't arrived yet");
            //UNCOMMENT LATER } else {
                console.log("boarding bus");
                var stopLat = stop.location.lat;
                var stopLng = stop.location.lng;
                var URL = "http://api.transloc.com/1.2/vehicles.json?agencies=116&routes=" + routeId;
                $.getJSON(URL, function(jsonData) {
                    var thisData = jsonData.data[116];
                    for(var i in thisData) {
                        var busId = thisData[i].vehicle_id;
                        console.log(busId);
                        var busLat = thisData[i].location.lat;
                        var busLng = thisData[i].location.lng;
                    // UNCOMMENT LATER if(distance(stopLat,stopLng,busLat,busLng,"K") <= .1) {
                            console.log("we got our bus " + busId);
                            console.log("at position " + i);
                            var dataToStore = JSON.stringify(thisData[i]);
                            console.log("storing: " + dataToStore);
                            localStorage.setItem("boardedBus", dataToStore);
                            window.location = "selectArrivalStop.html";
                            break;
                      // UNCOMMENT LATER } else {
                       //UNCOMMENT LATER     console.log("bus" + busId + "hasnt arrived");
                      // UNCOMMENT LATER }
                    } // end for
                });
          //UNCOMMENT LATER  }
            /*
            var param = $(this).attr("data-parm");
            var dataToStore = JSON.stringify(thisData[param]);
            //console.log("storing: " + dataToStore);
            localStorage.setItem("selectedRoute",dataToStore);
            */
    	});

	});
    

}

function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}  

