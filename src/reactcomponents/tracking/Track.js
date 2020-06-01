import React, {Component} from "react";
import {Badge, Col, Container, ListGroupItem, FormGroup, Input, Label, ListGroup} from "reactstrap";
import {GoogleApiWrapper, Map} from "google-maps-react";
import Multiselect from 'react-widgets/lib/Multiselect'

import axios from "axios";
import socketIOClient from "socket.io-client";

/*
* get all routes
* draw the pick-up point on the map each rout with certain color
* for each route listen to bus location
* */
class Track
    extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speedLimit: 9999999999999999999,
            routesSpeeds: [],
            routes: [],
            routesOptions: [],
            response: false,
            url: "http://localhost:5001",
            google: null,
            infowindow: null,
            map: null,
            allBounds: null,
            currentBounds:null
        };
    }

    distance(latlng1, latlng2, unit) {
        let lat1 = latlng1.lat;
        let lon1 = latlng1.lng;
        let lat2 = latlng2.lat;
        let lon2 = latlng2.lat;
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        } else {
            let radlat1 = Math.PI * lat1 / 180;
            let radlat2 = Math.PI * lat2 / 180;
            let theta = lon1 - lon2;
            let radtheta = Math.PI * theta / 180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === "K") {
                dist = dist * 1.609344
            }
            if (unit === "N") {
                dist = dist * 0.8684
            }
            return dist;
        }
    }

    startTracking = () => {
        const {google, map} = this.state;
        const socket = socketIOClient('http://localhost:5001');
        let {routes} = this.state;
        for (let i = 0; i < routes.length; i++) {
            let lineSymbol = {
                geodesic: true,
                strokeColor: routes[i].color,
                fillColor: routes[i].color

            };
            socket.on(routes[i].name, data => {
                let to = {lat: data.latitude, lng: data.longitude};
                let from = to;
                let speed = 0;
                let timeStampSeconds = Math.floor(Date.now() / 1000);
                if (routes[i].trackData) {
                    from = {lat: routes[i].trackData.latitude, lng: routes[i].trackData.longitude};
                    let timeSeconds = timeStampSeconds - routes[i].timeStamp;
                    speed = this.distance(from, to, 'K') / timeSeconds;
                }
                new google.maps.Polyline({
                    path: [from, to],
                    icons: [{
                        icon: lineSymbol,
                        offset: '100%'
                    }],
                    strokeColor: routes[i].color,
                    strokeWeight: 4,
                    strokeOpacity: .8,
                    map: map
                });
                routes[i].trackData = data;
                routes[i].timeStamp = timeStampSeconds;
                let newSpeeds = Object.assign([], this.state.routesSpeeds);
                newSpeeds[i] = speed;
                this.setState({routesSpeeds: newSpeeds});
                map.fitBounds(this.state.currentBounds);

                if (routes[i].trackMarker) {
                    routes[i].trackMarker.setPosition(to);
                } else {
                    let marker = new google.maps.Marker({
                        map: map,
                        position: to,
                        title: routes[i].bus.bus_numbers,
                        icon: this.getMarkerIcon(routes[i].color, google),
                    });
                    routes[i].trackMarker = marker;
                }
            });
        }
    };
    setRoutesPoints = () => {
        const {google, map, infowindow} = this.state;
        let bounds = new google.maps.LatLngBounds();
        let speeds = [];
        this.state.routes.forEach(route => {
            if (route.color == null) {
                route.color = this.getRandomColor();
            }

            let routeBounds = new google.maps.LatLngBounds();

            route.coordinates.forEach(pickUpPoint => {
                let marker = new google.maps.Marker({
                    map: map,
                    position: {lat: pickUpPoint.latitude, lng: pickUpPoint.longitude},
                    title: pickUpPoint.address,
                    icon: this.getMarkerIcon(route.color, google),
                    label: {text: pickUpPoint.label, color: "black"}
                });
                routeBounds.extend(marker.getPosition());
                marker.addListener('click', function () {
                    infowindow.setContent(pickUpPoint.address);
                    infowindow.open(map, marker);
                    map.setCenter(marker.getPosition());
                });

            });
            route.bounds = routeBounds;
            bounds.union(routeBounds);
            speeds.push(0);
        });
        this.setState({allBounds: bounds,currentBounds:bounds , routesSpeeds: speeds});
        map.fitBounds(bounds);

    };

    initialize = () => {
        axios({
            url: '/get_All_routes',
            method: 'get',
        }).then((res) => {
            if (res.data.routes) {
                this.setState({routes: res.data.routes});
                let options = [{id: 'all', name: 'Track All'}];
                this.state.routes.forEach(route => {
                    options.push({id: route.id, name: route.name});
                });
                this.setState({routesOptions: options});
                this.setRoutesPoints();
                this.startTracking();

            }
        }).catch(error => {
            console.log(error)
        });
    };

    getMarkerIcon(color, google) {
        return {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 1,
            scale: 1,
            size: new google.maps.Size(40, 40),
            scaledSize: new google.maps.Size(32, 32),
            labelOrigin: new google.maps.Point(0, -28)
        };
    }

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    initMap = (mapProps, map) => {
        const {google} = mapProps;
        this.setState({
            google,
            map,
            infowindow: new google.maps.InfoWindow,
        });
        // Create the search box and link it to the UI element.
        let input = document.getElementById('pac-input');
        let searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', async () => {
            let places = await searchBox.getPlaces();

            if (!places || places.length === 0) {
                alert('no places are found, Try again');
                return;
            }
            let bounds = new google.maps.LatLngBounds();
            let place = places[0];
            if (!place.geometry) {
                alert("Returned place contains no geometry");
                return;
            }
            // Create a marker for each place.
            let marker = new google.maps.Marker({
                map: map,
                title: place.formatted_address,
                position: place.geometry.location,
            });

            marker.addListener('dblclick', () => {
                marker.setMap(null);
            });

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
            map.fitBounds(bounds);
        });

        this.initialize();
    };
    onRouteSelect = (selectedItems) => {////////////////not completed
        if (selectedItems.length > 0) {
            let bounds = new this.state.google.maps.LatLngBounds();
            for (let item of selectedItems) {
                if (item.id === 'all') {
                    bounds = this.state.allBounds;
                    break;
                } else {
                    let route = this.state.routes.find((route) => route.id === item.id);
                    if (route) bounds.union(route.bounds);
                }
            }
            this.state.map.fitBounds(bounds);
        }
    };

    onInputSpeedChange = (e) => {
        const {value} = e.target;
        const {map} = this.state;
        this.setState({speedLimit: value});
        map.fitBounds(this.state.currentBounds);

    };

    render() {
        return (
            <Container style={{paddingBottom: 600}}>


                {this.state.routesOptions.length > 0 &&
                <div>
                    <FormGroup style={{color: 'white'}}>
                        <Col sm={2}>
                            <Label for="speed">Speed limit</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="speed" type="number" size="sm" min={0} onChange={this.onInputSpeedChange}/>km/s
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        {

                            this.state.routes.map((route, index) => {
                                let speed = this.state.routesSpeeds.length > 0 ? this.state.routesSpeeds[index] : 0;
                                return (
                                    <ListGroup key={route.id}>
                                        <ListGroupItem className={'justify-content-between'}>{route.name}
                                            <Badge pill
                                                   color={speed <= this.state.speedLimit ? 'success' : 'danger'}>{speed.toFixed(2)} km/s</Badge>
                                        </ListGroupItem>
                                    </ListGroup>
                                );
                            })
                        }
                    </FormGroup>
                    <FormGroup>
                        <Multiselect
                            id={'fields'}
                            data={this.state.routesOptions}
                            valueField='id'
                            textField='name'
                            defaultValue={this.state.routesOptions[0]}
                            onChange={this.onRouteSelect}
                        />
                    </FormGroup>
                </div>

                }

                <FormGroup row={true}>
                    <Input id="pac-input" className="controls" type="text" style={{width: '80%', marginLeft: 120}}
                           placeholder="Search Box"/>

                    <Map google={this.props.google}
                         style={{height: '90%', width: '82%'}}
                         className={'map'}
                         zoom={8}
                         onClick={this.mapClicked}
                         onReady={this.initMap}
                         center={{lat: 29.8205, lng: 30.8029}}
                    />
                </FormGroup>
            </Container>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBVYxIMHV0rlhKZMRbS8kE1bMyv9KFHugg',
    /*
        apiKey: 'AIzaSyB_eohRvcHqlhhPU7COoebF_gaKFSpXKcs',
    */
    v: "3"
})(
    Track
)
;