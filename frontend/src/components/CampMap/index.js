import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory, useParams } from "react-router-dom";
import './CampMap.css';

function CampMap({ camps, highlightedCamp, mapEventHandlers={}, markerEventHandlers={}, mapOptions={} }) {

  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const history = useHistory();
  const markers = useRef({});


  // Create the map
  useEffect(() => {
    if (!map) {
      setMap(new window.google.maps.Map(mapRef.current, {
        center: {
          lat: 37.773972,
          lng: -122.431297
        }, // San Francisco coordinates
        zoom: 13,
        clickableIcons: false,
        ...mapOptions,
      }));
    }
  }, [mapRef, map, mapOptions]);



  // Update map markers whenever `benches` changes
  useEffect(() => {

    if (map) {
      // Add markers for new benches

      const bounds = new window.google.maps.LatLngBounds();

      camps.forEach((camp) => {
        if (markers.current[camp.id]) return;
        const position = new window.google.maps.LatLng(camp.latitude, camp.longitude);
        bounds.extend(position);
        const marker = new window.google.maps.Marker({ 
          map, 
          position,
          label: { 
            text: `$${camp.price.toString()}`, 
            fontWeight: 'bold',
            color: 'black'
          }
        });

        

        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(camp));
        });
        markers.current[camp.id] = marker;
      })
  
      // Remove markers for old benches
      Object.entries(markers.current).forEach(([campId, marker]) => {
        if (camps.some(camp => camp.id.toString() === campId)) return;
        
        marker.setMap(null);
        delete markers.current[campId];
      })

      // if(!params.id){
      //   map.fitBounds(bounds);
      // }

    }
  }, [camps, history, map, markerEventHandlers]);

  // Change the style for bench marker on hover
  useEffect(() => {
    Object.entries(markers.current).forEach(([campId, marker]) => {
      const label = marker.getLabel();
      const icon = marker.getIcon();

      if (parseInt(campId) === highlightedCamp) {
        marker.setLabel({ ...label, color: 'white' });
        marker.setIcon({ ...icon, fillColor: 'black' });
      } else {
        marker.setLabel({ ...label, color: 'black' });
        marker.setIcon({ ...icon, fillColor: 'white' });
      }
    });
  }, [markers, highlightedCamp]);


  return (
    <div ref={mapRef} className="map">
      Map placeholder
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