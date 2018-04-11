import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { gKey } from '../../private/keys';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      currentMarker: {}
    };
  }

  onMapClick = (props, event, map) => {
    const currentMarker = {
      lat: map.latLng.lat(),
      lng: map.latLng.lng()
    };
    this.setState({ currentMarker }, this.props.captureMarkerCoords(currentMarker));
  }

  render() {
    const location = { lat: 39.7508006, lng: -104.9965947 };
    return (
      <div className='map-container'>
        <Map
          containerStyle={{position: 'absolute', top: '150px', left: '50%', width: '50%', height: '50%'}}
          centerAroundCurrentLocation={true}
          onClick={this.onMapClick}
          google={this.props.google}
          initialCenter={location}
          center={location}
          zoom={16}>
          <Marker
            name='Turing School'
            title='Turing School'
            position={location} />
          {
            this.state.currentMarker &&
            <Marker
              name='your click'
              title='some place'
              position={this.state.currentMarker} />
          }
        </Map>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  captureMarker: marker => dispatch(actions.captureMarker(marker))
});

MapContainer.propTypes = {
  google: PropTypes.object.isRequired,
  captureMarker: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(
  GoogleApiWrapper({ apiKey: gKey })(MapContainer)
);