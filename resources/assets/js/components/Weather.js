import React, { Component } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import Skycons from "react-skycons";
import * as moment from "moment";
import SimpleMap from "./SimpleMap.js";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      latitude: undefined,
      longitude: undefined,
      summary: undefined,
      cloudcover: undefined,
      pressure: undefined,
      wind: undefined,
      humidity: undefined,
      forecastSummary: undefined,
      icon: undefined,
      temperature: undefined,
      city: undefined,
      error: undefined,
      update: false,
      days: []
    };
  }

  componentWillMount() {
    var Skycons = require("react-skycons");
    let $this = this;

    // get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onPositionReceived,
        onPositionNotReceived
      );
    }

    function onPositionNotReceived(positionerror) {
      console.log(positionerror);
    }

    function onPositionReceived(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      $this.setState({
        latitude: latitude,
        longitude: longitude
      });
      console.log($this.state.latitude);
      console.log($this.state.longitude);

      Axios.post("../public/api/darksky", {
        latitude: $this.state.latitude,
        longitude: $this.state.longitude
      })
        .then(Response => {
          console.log(Response.data.weather.daily.data);
          $this.setState({
            summary: Response.data.weather.currently.summary,
            icon: Response.data.weather.currently.icon
              .toUpperCase()
              .replace(/-/g, "_"),
            temperature: Math.round(
              Response.data.weather.currently.temperature
            ),
            humidity: Math.round(
              Response.data.weather.currently.humidity * 100
            ),
            cloudcover: Response.data.weather.currently.cloudCover,
            wind: Math.round(Response.data.weather.currently.windSpeed),
            pressure: Math.round(Response.data.weather.currently.pressure),
            city: Response.data.addr.results[0].formatted_address,
            days: Response.data.weather.daily.data,
            forecastSummary: Response.data.weather.daily.summary
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="geomap">
            <a>
              <span className="lnr lnr-chevron-right" />
            </a>

            <SimpleMap lat={this.state.latitude} lng={this.state.longitude} />
          </div>
          <div className="col">
            <div className="nav-wrapper-alert">
              <ul className="forecast">
                <li className="active">
                  <span className="date">humidity</span>
                  <span className="lnr condition">
                    <span
                      className="temp"
                      style={{ width: "50px", margin: "0 auto" }}
                    >
                      <span className="lnr lnr-drop" />
                    </span>
                    <span className="temp">
                      {this.state.humidity}
                      <span className="temp-type">%</span>
                    </span>
                  </span>
                </li>
                <li className="active">
                  <span className="date">wind speed</span>
                  <span className="lnr condition">
                    <span
                      className="temp"
                      style={{ width: "50px", margin: "0 auto" }}
                    >
                      <span className="lnr lnr-flag" />
                    </span>
                    <span className="temp">
                      {this.state.wind}
                      <span className="temp-type">KM/h</span>
                    </span>
                  </span>
                </li>

                <li className="active">
                  <span className="date">Cloud cover</span>
                  <span className="lnr condition">
                    <span
                      className="temp"
                      style={{ width: "50px", margin: "0 auto" }}
                    >
                      <span className="lnr lnr-cloud" />
                    </span>
                    <span className="temp">{this.state.cloudcover}</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="weather-card one">
              <div className="top">
                <div className="wrapper">
                  <div className="mynav">
                    <a>
                      <span className="lnr lnr-chevron-left" />
                    </a>
                    <a>
                      <span className="lnr lnr-plus-circle" />
                    </a>
                    <a>
                      <span className="lnr lnr-earth" />
                    </a>
                  </div>
                  <h1 className="heading">{this.state.summary}</h1>
                  <h3 className="location">{this.state.city}</h3>
                  <p className="temp">
                    <span className="temp-value">{this.state.temperature}</span>
                    <span className="deg">0</span>
                    <a>
                      <span className="temp-type">C</span>
                    </a>
                    <div style={{ width: "150px", margin: "0 auto" }}>
                      <Skycons
                        color="white"
                        icon={this.state.icon}
                        autoplay={true}
                      />
                    </div>
                  </p>
                </div>
              </div>
              <div className="bottom">
                <div className="wrapper">
                  <ul className="forecast">
                    <a>
                      <span className="lnr lnr-chevron-up go-up" />
                    </a>

                    {this.state.days.map((day, i) => (
                      <li className="active">
                        <span className="date">
                          {moment(moment.unix(day.time)).format("dddd")}
                        </span>
                        <span className="lnr condition">
                          <span
                            className="temp"
                            style={{ width: "50px", margin: "0 auto" }}
                          >
                            <Skycons
                              color="black"
                              icon={day.icon.toUpperCase().replace(/-/g, "_")}
                              autoplay={true}
                            />
                          </span>
                          <span className="temp">
                            {Math.round(day.apparentTemperatureHigh)}
                            <span className="deg">0</span>
                            <span className="temp-type">C</span>
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="bottom-footer">
                <h2 className="heading2">{this.state.forecastSummary}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

if (document.getElementById("weather")) {
  ReactDOM.render(<Weather />, document.getElementById("weather"));
}
