import React from "react";
import { MdSunny } from "react-icons/md";

function WeatherWidget() {
  return (
    <div className="widget-card">

      <div className="widget-header">

        <MdSunny
          className="widget-icon"
          color="#FFC107"
        />

        <h3>Weather</h3>

      </div>

      <h1>30°C ☀️</h1>

      <p>Sunny</p>

      <small>Erode, Tamil Nadu</small>

    </div>
  );
}

export default WeatherWidget;