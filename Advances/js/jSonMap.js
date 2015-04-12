if (GBrowserIsCompatible()) {
      // Display the map, with some controls
      var map = new GMap(document.getElementById("map"));
      map.addControl(new GLargeMapControl());
      map.addControl(new GMapTypeControl());
      map.setCenter(new GLatLng(43.907787,-79.359741),9);
   
      // arrays to hold copies of the markers and html used by the side_bar
      // because the function closure trick doesnt work there
      var side_bar_html = "";
      var gmarkers = [];
      var htmls = [];
      var i = 0;

      // A function to create the marker and set up the event window
      function createMarker(point,name,html) {
        var marker = new GMarker(point);
        GEvent.addListener(marker, "click", function() {
          marker.openInfoWindowHtml(html);
        });
        // save the info we need to use later for the side_bar
        gmarkers[i] = marker;
        htmls[i] = html;
        // add a line to the side_bar html
      /*  side_bar_html += '<a href="javascript:myclick(' + i + ')">' + name + '<\/a><br>'; */
        i++;
        return marker;
      }

      // This function picks up the click and opens the corresponding info window
      function myclick(i) {
        gmarkers[i].openInfoWindowHtml(htmls[i]);
      }

      // ================================================================
      // === Define the function thats going to process the JSON file ===
      process_it = function(doc) {
        // === Parse the JSON document === 
        var jsonData = eval('(' + doc + ')');
        
        // === Plot the markers ===
        for (var i=0; i<jsonData.markers.length; i++) {
          var point = new GLatLng(jsonData.markers[i].lat, jsonData.markers[i].lng);
          var marker = createMarker(point, jsonData.markers[i].label, jsonData.markers[i].html);
          map.addOverlay(marker);
        }

        // put the assembled side_bar_html contents into the side_bar div
        document.getElementById("side_bar").innerHTML = side_bar_html;

        // === Plot the polylines ===
        for (var i=0; i<jsonData.lines.length; i++) {
          var pts = [];
          for (var j=0; j<jsonData.lines[i].points.length; j++) {
            pts[j] = new GLatLng(jsonData.lines[i].points[j].lat, jsonData.lines[i].points[j].lng);
          }
          map.addOverlay(new GPolyline(pts, jsonData.lines[i].colour, jsonData.lines[i].width)); 
        }
      }          
      
      // ================================================================
      // === Fetch the JSON data file ====    
      GDownloadUrl("data.json", process_it);
      // ================================================================

    }

    else {
      alert("Sorry, the Google Maps API is not compatible with this browser");
    }
