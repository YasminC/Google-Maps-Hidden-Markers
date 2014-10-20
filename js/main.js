
       var markers = [];
       var map;
       var pizza_1 = {
        url: "img/icon.png",
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(50, 50)
      };
      var start_img = {
        url: "img/start_img.png",
        size: new google.maps.Size(100, 100),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(70, 80)
      };

          function addMarker(map, name, location) {
          var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon:pizza_1
          });

           google.maps.event.addListener(map, 'zoom_changed', function() {
           var zoom_marker = map.getZoom();
          if(zoom_marker > 17){
            marker.setMap(map);
          } else {
            marker.setMap(null);  
          }
          console.log(map.getZoom());
          })
       }


      function initialize() {

        //$.getJSON("markers.json").fail(function(jqXHR, status, error){
          //if(status == 'parseerror'){
         // console.log('cant find json');
         // } else {
         // console.log('something else');
         // }
        //})

       var map = new google.maps.Map(document.getElementById("map-canvas"),{
        center: new google.maps.LatLng(51.453522,-2.584687),
        icon:start_img,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        });

       var marker = new google.maps.Marker({
      position: new google.maps.LatLng(51.453522,-2.584687),
      map: map,
      icon: start_img
      });

       for(var x in pizza_markers) {
        var pizzas = pizza_markers[x];

        if(pizzas.status == "hide"){
          console.log('found hidden one');
        }else{
        var location = new google.maps.LatLng(pizzas.lat,pizzas.lng);
        addMarker(map, pizzas.name, location);  
  
        }
      }
         // Create the search box and link it to the UI element.
       var input = /** @type {HTMLInputElement} */(
       document.getElementById('pac-input'));
       map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

      // [START region_getplaces]
      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      google.maps.event.addListener(searchBox, 'places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      for (var i = 0, marker; marker = markers[i]; i++) {
        marker.setMap(null);
      }

      // For each place, get the icon, place name, and location.
      markers = [];
      var bounds = new google.maps.LatLngBounds();
      for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      zoom:20;

      bounds.extend(place.geometry.location);
      }

      map.fitBounds(bounds);
      });
    // [END region_getplaces]

    // Bias the SearchBox results towards places that are within the bounds of the
    // current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
    });

    }

     google.maps.event.addDomListener(window, 'load', initialize);
