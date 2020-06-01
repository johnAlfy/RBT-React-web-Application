import React from "react";
import {Col} from "reactstrap";

const {compose, withProps, lifecycle} = require("recompose");
const {withScriptjs} = require("react-google-maps");
const {
    StandaloneSearchBox
} = require("react-google-maps/lib/components/places/StandaloneSearchBox");

const SearchPlaces = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyB_eohRvcHqlhhPU7COoebF_gaKFSpXKcs&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>
    }),
    lifecycle({
        componentWillMount() {
            const refs = {};

            this.setState({
                places: [],
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();

                    this.setState({
                        places
                    });
                }
            });
        }
    }),
    withScriptjs
)(props => (
    <div data-standalone-searchbox="">
        <StandaloneSearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            onPlacesChanged={props.onPlacesChanged}
        >
            <Col sm={4}>
                <input
                    type="text"
                    placeholder="Google Map address"
                    id={props.id}
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                     /*   width: `340px`,
                        height: `32px`,*/
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`
                    }}
                    onChange={props.onChange}
                    required={props.required}
                />
            </Col>
        </StandaloneSearchBox>
        <ol>
            {props.places.map(
                ({place_id, formatted_address, geometry: {location}}) => (
                    <li key={place_id}>
                        {formatted_address}
                        {" at "}
                        ({location.lat()}, {location.lng()})
                    </li>
                )
            )}
        </ol>
    </div>
));
export default SearchPlaces;