import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const position = [9.6165873, 105.9656155]; // Latitude and Longitude for map center

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "450", minWidth: '400px' }} // Set map dimensions
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Lau Mam Cay Dua
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
