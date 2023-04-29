import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory, useParams } from "react-router-dom";
import './CampMap.css';

function CampMap({ camps, highlightedCamp, markerEventHandlers={}, mapOptions={} }) {

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
        zoom: 12,
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
          icon: {
            path: `
            M 16.0018 28.3702 C 22.8183 28.3702 28.3441 22.8444 28.3441 16.0279 C 28.3441 9.21141 22.8183 3.68555 16.0018 3.68555 C 9.18528 3.68555 3.65942 9.21141 3.65942 16.0279 C 3.65942 22.8444 9.18528 28.3702 16.0018 28.3702 Z
            M 16.0044 0 C 11.7462 0.0194219 7.66964 1.72728 4.66921 4.74882 C 1.66878 7.77036 -0.0104598 11.8588 -0.0000279796 16.117 C -0.0000279796 28.7459 14.4975 41.7853 15.1143 42.3332 C 15.3587 42.5493 15.6737 42.6687 15.9999 42.6687 C 16.3262 42.6687 16.6412 42.5493 16.8855 42.3332 C 17.5023 41.7841 31.9999 28.744 31.9999 16.1157 C 32.01 11.8593 30.3318 7.7725 27.3333 4.75149 C 24.3348 1.73047 20.2608 0.0217593 16.0044 0 Z M 16.0044 27.4143 C 13.7523 27.4143 11.5508 26.7465 9.67834 25.4953 C 7.80584 24.2442 6.3464 22.4658 5.48458 20.3852 C 4.62276 18.3046 4.39728 16.0152 4.83663 13.8064 C 5.27598 11.5976 6.36044 9.56874 7.95287 7.9763 C 9.5453 6.38387 11.5742 5.29941 13.783 4.86006 C 15.9917 4.42071 18.2812 4.6462 20.3618 5.50802 C 22.4424 6.36984 24.2207 7.82927 25.4719 9.70178 C 26.7231 11.5743 27.3909 13.7757 27.3909 16.0278 C 27.3874 19.0466 26.1866 21.9408 24.052 24.0754 C 21.9173 26.21 19.0232 27.4108 16.0044 27.4143 Z
            M 23.6788 20.2087 L 16.1511 7.99157 C 16.1326 7.96023 16.1062 7.93425 16.0746 7.91621 C 16.043 7.89816 16.0072 7.88867 15.9708 7.88867 C 15.9344 7.88867 15.8986 7.89816 15.867 7.91621 C 15.8354 7.93425 15.809 7.96023 15.7905 7.99157 C 14.7505 9.72169 9.4109 18.4254 8.31779 20.2194 C 8.29971 20.2514 8.29023 20.2874 8.29028 20.3241 C 8.29034 20.3608 8.29992 20.3969 8.31809 20.4288 C 8.33627 20.4607 8.36241 20.4873 8.39396 20.506 C 8.42551 20.5248 8.46139 20.535 8.49808 20.5357 H 13.2001 C 13.2366 20.5345 13.2723 20.5241 13.3037 20.5055 C 13.3352 20.487 13.3616 20.4608 13.3804 20.4294 C 13.8687 19.6229 15.2591 16.887 15.7576 16.0564 C 15.7726 16.0209 15.7978 15.9906 15.8299 15.9693 C 15.862 15.948 15.8997 15.9367 15.9382 15.9367 C 15.9768 15.9367 16.0144 15.948 16.0466 15.9693 C 16.0787 15.9906 16.1038 16.0209 16.1188 16.0564 L 18.5922 20.4402 C 18.6115 20.4703 18.6383 20.4948 18.6699 20.5116 C 18.7014 20.5283 18.7368 20.5366 18.7725 20.5357 H 23.4853 C 23.5246 20.5385 23.5639 20.5302 23.5989 20.5119 C 23.6338 20.4936 23.6629 20.4659 23.683 20.4319 C 23.7031 20.398 23.7133 20.3592 23.7126 20.3197 C 23.7119 20.2803 23.7002 20.2418 23.6788 20.2087 Z M 15.442 15.4219 L 12.9154 19.9227 C 12.9047 19.9335 12.8939 19.9436 12.8838 19.9335 C 12.7573 19.8595 12.0981 19.4243 11.3763 17.3545 C 11.3656 17.3336 11.3871 17.3228 11.3972 17.3228 C 11.6414 17.3121 13.0957 17.1849 15.4097 15.3909 C 15.4312 15.3681 15.4635 15.3884 15.442 15.4213 V 15.4219 Z
            `,
            fillOpacity: 2,
            fillColor: '#464F2E',
            strokeColor: 'white',
            strokeWeight: 1,
            scale: 1,
            labelOrigin: new window.google.maps.Point(1.5, 1),
            anchor: new window.google.maps.Point(1.5, 1)
          }, 
          
        });

        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(camp));
        });
        markers.current[camp.id] = marker;
      })
  
      // Remove markers for old camps
      Object.entries(markers.current).forEach(([campId, marker]) => {
        if (camps.some(camp => camp.id.toString() === campId)) return;
        
        marker.setMap(null);
        delete markers.current[campId];
      })
    }
  }, [camps, history, map, markerEventHandlers]);

  // Change the style for camps marker on hover
  useEffect(() => {
    Object.entries(markers.current).forEach(([campId, marker]) => {
      const icon = marker.getIcon();

      if (parseInt(campId) === highlightedCamp) {
        marker.setIcon({ ...icon, fillColor: 'orange' });
      } else {
        marker.setIcon({ ...icon, fillColor: '#464F2E' });
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