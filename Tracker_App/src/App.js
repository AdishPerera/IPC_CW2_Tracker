import React, { useEffect, useState } from "react";

import { database } from "./firebase";
import { ref, onValue } from "firebase/database";

export default function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });

  const [temperature, setTemperature] = useState("");

  useEffect(() => {
    fetchLocation();
    fetchTemperature();
  }, []);

  const fetchLocation = () => {
    const databaseRef = ref(database, "GPS_Data");
    console.log("running");

    try {
      onValue(databaseRef, (snapshot) => {
        const value = snapshot.val();
        setCoordinates({
          ...coordinates,
          latitude: value.Latitude,
          longitude: value.Longitude,
        });
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  const fetchTemperature = () => {
    const databaseRef = ref(database, "TEMP_Data");
    console.log("running");

    try {
      onValue(databaseRef, (snapshot) => {
        const value = snapshot.val();
        setTemperature(value.temperatureC);
      });
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-secondary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            Location Tracker
          </a>
        </div>
      </nav>

      <div className="container">
        <p className="h5 mt-5 text-center">Generator GPS module Data</p>
        {coordinates.latitude && temperature ? (
          <div className="row mt-5">
            <div className="col-lg-6 col-sm-12 mb-3">
              <div className="card shadow border-0">
                <div className="card-header bg-dark text-white">
                  Location Data
                </div>
                <div className="card-body">
                  <p>
                    Latitude:{" "}
                    <span className="text-danger">{coordinates.latitude}</span>
                  </p>
                  <p>
                    Longitude:{" "}
                    <span className="text-danger">{coordinates.longitude}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12">
              <div className="card shadow border-0">
                <div className="card-header bg-dark text-white">
                  Temperature Data
                </div>
                <div className="card-body">
                  <p>
                    Temperature:{" "}
                    <span className="text-danger">{temperature} C°</span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-danger">
            Data has not been recived from GPS module
          </p>
        )}
      </div>
    </React.Fragment>
  );
}
