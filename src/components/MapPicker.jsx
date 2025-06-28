import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMarker = ({ setCoords, setPlaceName }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click: async (e) => {
      const latlng = e.latlng;
      setPosition(latlng);
      setCoords(latlng);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
        );
        const data = await res.json();
        if (setPlaceName) {
          setPlaceName(data.display_name || "Unknown location");
        }
      } catch (err) {
        console.error("Reverse geocoding failed:", err);
        if (setPlaceName) {
          setPlaceName("Location not found");
        }
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapPicker = ({ setCoords, setPlaceName }) => {
  return (
    <MapContainer
      center={[10.8505, 76.2711]}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: "300px", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker setCoords={setCoords} setPlaceName={setPlaceName} />
    </MapContainer>
  );
};

export default MapPicker;
