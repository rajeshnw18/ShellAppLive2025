import React, { useState } from "react";
import axios from "axios";

const CurrenctLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: null,
    error: null,
  });

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Update latitude and longitude
          setLocation((prev) => ({
            ...prev,
            latitude,
            longitude,
            error: null,
          }));

          // Reverse Geocoding to get address
          try {
           
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json`,
              {
                params: {
                  q: `${latitude},${longitude}`,
                  key: "f5b98bab5fd04e1884006c341aa644fe", // Replace with your API key
                },
              }
            );
            const address = response.data.results[0].formatted;
            console.log(response.data.results[0])
            console.log(latitude)
            setLocation((prev) => ({
              ...prev,
              address,
            }));
          } catch (error) {
            setLocation((prev) => ({
              ...prev,
              error: "Unable to fetch address details.",
            }));
          }
        },
        (error) => {
          setLocation((prev) => ({
            ...prev,
            error: error.message,
          }));
        }
      );
    } else {
      setLocation((prev) => ({
        ...prev,
        error: "Geolocation is not supported by your browser.",
      }));
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Current Location </h1>
      <button onClick={fetchLocation} style={{ padding: "10px 20px" }}>
        Get My Location
      </button>
      <div style={{ marginTop: "20px" }}>
        {location.latitude && <p>Latitude: {location.latitude}</p>}
        {location.longitude && <p>Longitude: {location.longitude}</p>}
        {location.address && <p>Address: {location.address}</p>}
        {location.error && <p style={{ color: "red" }}>{location.error}</p>}
      </div>
    </div>
  );
};

export default CurrenctLocation;
