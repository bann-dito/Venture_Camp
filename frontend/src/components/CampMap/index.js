import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import './CampMap.css';

function CampMap({ camps, highlightedCamp, mapEventHandlers={}, markerEventHandlers={}, mapOptions={} }) {

  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const history = useHistory();
  const markers = useRef({});

  console.log(map)
  console.log(camps)

  useEffect(() => {
      if (!map) {
          setMap(new window.google.maps.Map(mapRef.current, {
              center: { lat: camps.latitude, lng: camps.longitude },
              zoom: 1,
              clickableIcons: false,
              ...mapOptions,
              }));
      }
  }, [mapRef, map, mapOptions]);

  // Update map markers whenever `camps` changes
  useEffect(() => {
    if (map) {
      // Add markers for new camps
      camps.forEach((camp) => {
        if (markers.current[camp.id]) return;
  
        const marker = new window.google.maps.Marker({
          map,
          position: new window.google.maps.LatLng(camp.latitude, camp.longitude),
          label: {
            text: `$${camp.price.toString()}`,
            fontWeight: 'bold',
            color: 'black',
          },
          icon: {
            path: `
              M 1,0
              L 2,0
              A 1 1 0 0 1 3,1
              A 1 1 0 0 1 2,2
              L 1,2
              A 1 1 0 0 1 0,1
              A 1 1 0 0 1 1,0
              z
            `,
            fillOpacity: 1,
            fillColor: 'white',
            strokeColor: 'black',
            strokeWeight: 1,
            scale: 15,
            labelOrigin: new window.google.maps.Point(1.5, 1),
            anchor: new window.google.maps.Point(1.5, 1),
          },
        });
  
        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(camp));
        });
        markers.current[camp.id] = marker;
      });
  
      // Remove markers for old camps
      Object.entries(markers.current).forEach(([campId, marker]) => {
        if (camps.some((camp) => camp.id.toString() === campId)) return;
  
        marker.setMap(null);
        delete markers.current[campId];
      });
  
      // Create a LatLngBounds object to include all markers
      const bounds = new window.google.maps.LatLngBounds();
      Object.values(markers.current).forEach((marker) => bounds.extend(marker.getPosition()));
  
      // Fit the map to show all markers
      map.fitBounds(bounds);
    }
  }, [camps, history, map, markerEventHandlers]);

  // Change the style for camp marker on hover
  // useEffect(() => {
  //   Object.entries(markers.current).forEach(([campId, marker]) => {
  //     const label = marker.getLabel();
  //     const icon = marker.getIcon();

  //     if (parseInt(campId) === highlightedCamp) {
  //       marker.setLabel({ ...label, color: 'white' });
  //       marker.setIcon({ ...icon, fillColor: 'black' });
  //     } else {
  //       marker.setLabel({ ...label, color: 'black' });
  //       marker.setIcon({ ...icon, fillColor: 'white' });
  //     }
  //   });
  // }, [markers, highlightedCamp]);

  return (
    <div ref={mapRef} className="map">
      Map
    </div>
  );
}

function CampMapWrapper(props) {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <CampMap {...props} />
    </Wrapper>
  );
}

export default CampMapWrapper;
