Grumpy Cat search - Google Maps

Developer- Yasmin Curren

Overview

A 'Treasure Hunt' using the Google Maps API.
Grumpy Cat icons are hidden around the UK and the puppy wants to find them.

I am pulling out each marker using a JSON array, when the markers 'status' is changed to 'hide' then the marker is taken from the map using marker.setMap(null);

There is a search bar to help people find the grumpy cat markers.

The grumpy cat markers are only visible within a certain zoom point to avoid them being seen when zooming out to see the whole UK.