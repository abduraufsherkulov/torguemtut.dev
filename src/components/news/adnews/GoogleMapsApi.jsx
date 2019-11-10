import React from "react";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

function test(e, props) {
    props.setPosition({
        RegionId: "",
        DistrictId: "",
        Address: "",
        Longtitude: e.latLng.lng(),
        Latitude: e.latLng.lat()
    })
}
const defaultMapOptions = {
    fullscreenControl: true,
    zoomControl: true,
    disableDefaultUI: true
};



const GoogleMapsApi = compose(
    withProps({
        /**
         * Note: create and replace your own key in the Google console.
         * https://console.developers.google.com/apis/dashboard
         * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
         */
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDL4bGpcflipvkmToDwc_ELWpVxU75vuwM",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `250px` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultOptions={defaultMapOptions} defaultZoom={props.defaultZoom} defaultCenter={{ lat: 41.311157, lng: 69.279718 }}>
        <Marker draggable={true} onDragEnd={(e) => test(e, props)} position={{ lat: props.position.Latitude, lng: props.position.Longtitude }} />
    </GoogleMap>
));

export default GoogleMapsApi
