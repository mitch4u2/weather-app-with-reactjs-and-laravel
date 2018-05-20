import React, { Component, PropTypes } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      color: "white",
      width: "60px",
      height: "70px",
      backgroundImage:
        "url(" +
        "https://www.shareicon.net/download/2017/05/06/885707_umbrella_512x512.png" +
        ")",
      backgroundSize: "cover",
      padding: "15px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {text}
  </div>
);

class SimpleMap extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     center: {
  //       lat: props.lat,
  //       lng: props.lng
  //     },
  //     zoom: 11
  //   };
  // this.setState({
  //   center: {
  //     lat: this.props.lat,
  //     lng: this.props.lng
  //   }
  // });
  // }
  // componentWillReceiveProps(props) {
  //   this.setState({
  //     center: {
  //       lat: props.lat,
  //       lng: props.lng
  //     }
  //   });
  // }

  // componentWillMount(props) {
  //   this.setState({
  //     center: {
  //       lat: this.props.lat,
  //       lng: this.props.lng
  //     }
  //   });
  // }

  // this.setState({
  //     center: {
  //       lat: this.props.lat,
  //       lng: this.props.lng
  //     }
  //   });

  render() {
    // console.log("momomom" + this.state.center.lat);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "565px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAX1AOJ_EYCPyTMgob4r-m_qSDjfB75g1I" }}
          center={{
            lat: this.props.lat,
            lng: this.props.lng
          }}
          defaultZoom={11}
        >
          <AnyReactComponent lat={this.props.lat} lng={this.props.lng} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
