import React, { useEffect, useState } from 'react';
import { useJsApiLoader, GoogleMap, Marker } from '@react-google-maps/api';

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBV2ZSyp55RbSZJcS6OrpZHb4bFVc3Jm8s",
    libraries: ['places'],
  });

  const [map, setMap] = useState(null);

  const markers = [
    { lat: 20, lng: 78 },
    { lat: 21, lng: 79 },
    { lat: 19, lng: 90 },
    { lat: 64, lng: 79 },
    { lat: 46, lng: 87 },
    { lat: 10, lng: 130 },
  ];

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      center={{ lat: 20, lng: 78 }}
      zoom={3}
      mapContainerStyle={{ width: '100%', height: '400px' }}
      options={{
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onLoad={map => setMap(map as any)}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
      ))}
    </GoogleMap>
  );
};

export default Maps;
