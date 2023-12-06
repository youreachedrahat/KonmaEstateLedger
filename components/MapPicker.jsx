import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

function MapPicker(props) {
  const mapStyles = {
    width: '100%',
    height: '400px',
  };

  return (
    <div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 37.7749, // Default latitude (e.g., San Francisco)
          lng: -122.4194, // Default longitude
        }}
      >
        {/* Add a Marker */}
        <Marker
          name={'Your Location'}
          position={{ lat: 37.7749, lng: -122.4194 }}
        />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your Google Maps API Key
})(MapPicker);
