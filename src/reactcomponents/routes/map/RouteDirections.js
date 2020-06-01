import React, {Component} from "react";
//import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
//import * as google from "google";
import {GoogleApiWrapper, Map} from "google-maps-react";
import {connect} from "react-redux";


export class RouteDirections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pickUpPoints: [],
            directionsService: null,
            directionsDisplay: null
        };
    }

    save = () => {

    };
    displayRoute = (origin, destination, waypoints, service, display) => {
        service.route({
            origin: origin,
            destination: destination,
            waypoints,
            travelMode: 'DRIVING',
            avoidTolls: true
        }, function (response, status) {
            if (status === 'OK') {
                console.log("response");
                console.log(response);
                display.setDirections(response);
            } else {
                alert('Could not display directions due to: ' + status);
            }
        });
    };
    mapClicked = (mapProps, map, clickEvent) => {
        const {google} = mapProps;
        let newPoints = Object.assign([], this.state.pickUpPoints);
        let latLng = {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()};
        newPoints.push({latLng});
        this.setState({pickUpPoints: newPoints});
      /*  let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            index: this.state.pickUpPoints.length - 1,
            title: 'marker location',
            draggable: true
        });
        marker.addListener('dblclick', () => {
            let newPoints = Object.assign([], this.state.pickUpPoints);
            newPoints.splice(marker.index, 1);
            this.setState({pickUpPoints: newPoints});
            marker.setMap(null);
        });
        marker.addListener('click', function () {
            map.setZoom(18);
            map.setCenter(marker.getPosition());
        });
        */
        this.onRouteChange();

    };
    onRouteChange = () => {
        let pickUpPoints = this.state.pickUpPoints;
        if (pickUpPoints.length >= 2) {
            let waypoints = [];
            for (let i = 1; i < pickUpPoints.length - 1; i++) {
                waypoints.push({location: pickUpPoints[i].latLng});
            }
            this.displayRoute(pickUpPoints[0].latLng, pickUpPoints[pickUpPoints.length - 1].latLng,
                waypoints, this.state.directionsService, this.state.directionsDisplay);
        }
    };

    initMap = (mapProps, map) => {
        const {google} = mapProps;
        this.setState({
            geocoder: new google.maps.Geocoder(),
            infowindow: new google.maps.InfoWindow,
            directionsService: new google.maps.DirectionsService,
            directionsDisplay: new google.maps.DirectionsRenderer({
                draggable: true,
                map: map
            })
        });
        /*this.state.directionsDisplay.addListener('directions_changed', () => {
            console.log(this.state.directionsDisplay.getDirections());
            this.onRouteChange();
        });*/
    };

    render() {
        if (!this.props.google) {
            return <div>Loading...</div>;
        }

        return (

            <Map google={this.props.google}
                 style={{height: '100%', width: '100%', position: 'relative'}}
                 className={'map'}
                 zoom={14}
                 onClick={this.mapClicked}
                 onReady={this.initMap}
            >
            </Map>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        apiKey: state.rootReducer.apiKey
    }
};
export default connect(mapStateToProps)(GoogleApiWrapper({
/*
    apiKey: 'AIzaSyBVYxIMHV0rlhKZMRbS8kE1bMyv9KFHugg',
*/
    apiKey: 'AIzaSyB_eohRvcHqlhhPU7COoebF_gaKFSpXKcs',
    v: "3"
})(RouteDirections));