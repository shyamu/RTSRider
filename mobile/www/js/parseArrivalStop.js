$(document).ready(function () {
   // console.log(localStorage.getItem("selectedStop"));
   // console.log(localStorage.getItem("selectedRoute"));
    
    var jsonRouteData = JSON.parse(localStorage.getItem("selectedRoute"));
    console.log(jsonRouteData.long_name + " " + jsonRouteData.route_id);
//    jQuery(".page-header").find("small").text("Route: " + jsonRouteData.long_name + " Stop: " + jsonStopData.name);
  //  getArrivalTime(jsonRouteData,jsonStopData);
    var stopsArray = jsonRouteData.stops;
    for(var i in stopsArray) {
        console.log(stopsArray[i]);
    }
    var URL = "http://api.transloc.com/1.2/stops.json?agencies=116";
    $.getJSON(URL, function(jsonData) {
        var thisData = jsonData.data;
       
        for(var i in thisData) {
            var thisName = thisData[i].name;
            if($.inArray(thisData[i].stop_id,stopsArray) != -1) {
                $(".list-group").append('<li class="list-group-item"><a data-parm="'+ i + '" href="./departBus.html">' + thisName + '</li>');
            }
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
    
});


