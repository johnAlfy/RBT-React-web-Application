import React, {Component} from "react";
import axios from "axios";
import {Container, Col, Alert, Input, Label, FormGroup, Form, Button} from "reactstrap";
import {GoogleApiWrapper, Map} from "google-maps-react";


export class AddRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            route: {
                name: null,
                busId: null,
                pickUpPoints: []
            },
            buses: [],
            markers: [],
            geocoder: null,
            infowindow: null,
            searchBox: null,
            searchValue: null,
            placesService: null
        };
        this.getBuses();
    }

    getBuses=()=>{
        axios({
            url: '/get_buses_without_routes',
            method: 'get',
        }).then((res) => {
            this.setState(state => ({
                ...state,
                buses: res.data.buses,
                route: {
                    ...state.route,
                    busId: res.data.buses.length > 0 ? res.data.buses[0].id : null
                }
            }));

        }).catch(error => {
            console.log(error)
        });
};

    mapClicked = (mapProps, map, clickEvent) => {
        //const {google} = mapProps;
        let request = {
            query: `${clickEvent.latLng.lat()}, ${clickEvent.latLng.lng()}`,
            location: {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()},
            bounds: this.state.searchBox.getBounds()
        };
        this.state.placesService.textSearch(request, async (places) => {
            //set the places-property of the SearchBox
            //places_changed will be triggered automatically
            this.state.searchBox.set('places', places || []);
        });
    };


    /*let input = document.getElementById("pac-input");
        this.setState({searchValue: `${clickEvent.latLng.lat()}, ${clickEvent.latLng.lng()}`});
        let event = new Event('change');
        input.dispatchEvent(event);
        input.focus();
        let evt = new KeyboardEvent('keydown', {keyCode: 13, which: 13});
        document.dispatchEvent(evt);
        google.maps.event.trigger(this.state.searchBox, 'places_changed');*/
        /*
        let newMarkers = Object.assign([], this.state.markers);
        let latlng = {lat: clickEvent.latLng.lat(), lng: clickEvent.latLng.lng()};
        let marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: 'marker location',
            draggable: true
        });
        marker.addListener('dblclick', () => {
            let newMarkers = Object.assign([], this.state.markers);
            let index = newMarkers.indexOf(marker);
            newMarkers.splice(index, 1);
            this.setState({markers: newMarkers});
            marker.setMap(null);
        });
        marker.addListener('dragend', function () {
            console.log(marker.getPosition());
        });
        newMarkers.push(marker);
        this.setState({markers: newMarkers});*/
        /*setTimeout(()=> {

            this.state.geocoder.geocode({'location': latlng}, (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        map.setZoom(11);
                        let marker = this.props.google.maps.Marker({
                            position: latlng,
                            map: map,
                            name: results[0].formatted_address,
                            draggable: true,
                        });
                        marker.addListener('dblclick', () => {
                            marker.setMap(null);
                        });
                        this.state.infowindow.setContent(results[0].formatted_address);
                        this.state.infowindow.open(map, marker);
                        marker.addListener('click', () => {
                            this.state.infowindow.open(map, marker);
                            map.setCenter(marker.getPosition());
                        });
                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            })
        }, 2000);*/


    initMap = (mapProps, map) => {
        const {google} = mapProps;
        this.setState({
            geocoder: new google.maps.Geocoder(),
            infowindow: new google.maps.InfoWindow,
        });
        // Create the search box and link it to the UI element.
        let input = document.getElementById('pac-input');
        let searchBox = new google.maps.places.SearchBox(input);
        let placesService = new google.maps.places.PlacesService(map);
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
                number: this.state.markers.length + 1,
                label: `${this.state.markers.length + 1}`,
                draggable: true
            });

            marker.addListener('dblclick', () => {
                let index = this.state.markers.indexOf(marker);
                this.state.markers.splice(index, 1);
                for (let i = index; i < this.state.markers.length; i++) {
                    this.state.markers[i].setLabel(`${i + 1}`);
                }
                marker.setMap(null);
            });
            /*marker.addListener('dragend', function () {
                console.log(marker.getPosition().lat());
                console.log(marker.getPosition().lng());
                alert(marker.label);
            });*/
            let newMarkers = Object.assign([], this.state.markers);
            newMarkers.push(marker);
            this.setState({markers: newMarkers});

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
            map.fitBounds(bounds);
        });
        this.setState({searchBox, placesService});
    };

    onRouteNameChange = (e) => {
        const value = e.target.value;
        this.setState(state => ({
            ...state,
            route: {
                ...state.route,
                name: value
            }
        }));
    };
    onBusSelect = (e) => {
        const {value} = e.target;
        this.setState(state => ({
            ...state,
            route: {
                ...state.route,
                busId: value
            }
        }));
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.markers.length === 0) {
            this.setState({
                alert: <Alert color={'danger'}>must set at least 1 pick-up point</Alert>
            });
        } else {
            let pickUpPoints = [];
            this.state.markers.forEach(marker => {
                let point = {
                    lat: marker.getPosition().lat(),
                    lng: marker.getPosition().lng(),
                    label: marker.label,
                    address: marker.getTitle()
                };
                pickUpPoints.push(point);
            });
            this.setState(state => ({
                ...state,
                route: {
                    ...state.route,
                    pickUpPoints
                }
            }));
            axios({
                url: '/add_route',
                method: 'post',
                data: {
                    route: this.state.route
                }
            }).then((res) => {
                if (res.data.status === true) {
                    this.getBuses();
                    this.setState({
                        alert: <Alert color={'success'}>{res.data.route.name} is added successfully</Alert>
                    });
                } else {
                    this.setState({
                        alert: <Alert color={'danger'}>{res.data.status}</Alert>
                    });
                }
            }).catch(error => {
                console.log(error)
            });
        }

    };

    render() {
        if (!this.props.google) {
            return <div>Loading...</div>;
        }

        return (
            <Container>
                <Form onSubmit={this.onSubmit} style={{color: 'white'}}>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="name">Route Name</Label>
                        </Col>
                        <Col sm={4}>
                            <Input id="name" type="text" size="sm" onChange={this.onRouteNameChange} required/>
                        </Col>

                    </FormGroup>
                    <FormGroup row={true}>
                        <Col sm={2}>
                            <Label for="selectBus">Available Buses</Label>
                        </Col>
                        <Col sm={4}>
                            <Input type="select" name="selectBus" id="selectBus"
                                   onChange={this.onBusSelect} required>
                                {
                                    this.state.buses.map(bus => {
                                        return (
                                            <option id={bus.id} value={bus.id}>{bus.bus_numbers}</option>
                                        );
                                    })
                                }
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row={true}>
                        <Col sm={3}/>
                        <Col sm={4}>
                            <Button sm={4} color={'success'}>Add Route</Button>
                        </Col>
                    </FormGroup>
                    {this.state.alert}
                    <FormGroup row={true}>
                        <Input id="pac-input" className="controls" type="text" style={{width: '80%', marginLeft: 120}}
                               placeholder="Search Box"/>

                        <Map google={this.props.google}
                             style={{height: '90%', width: '82%', position: 'static'}}
                             className={'map'}
                             zoom={8}
                             onClick={this.mapClicked}
                             onReady={this.initMap}
                             center={{lat: 29.8205, lng: 30.8029}}
                        />
                    </FormGroup>

                </Form>
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
})(AddRoute);