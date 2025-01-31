import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Header from '../../components/Header'
import SideNav from '../../components/SideNav'
import Footer from '../../components/Footer'

// Fix default icon issue for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMap = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    // Get user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  return (
    <><SideNav /><Header /><div style={{ height: "80vh" }}>
          {position ? (
              <MapContainer center={position} zoom={13} style={{margin:"6%", height: "100%", width: "100%" }}>
                  <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                  <Marker position={position}>
                      <Popup>You are here!</Popup>
                  </Marker>
              </MapContainer>
          ) : (
              <p>Loading your location...</p>
          )}
      </div><Footer /></>
  );
};

export default LocationMap;
