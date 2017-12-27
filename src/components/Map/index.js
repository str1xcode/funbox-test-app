import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './styles.css';

function loadJS(src) {
  const ref = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

const API_KEY = 'AIzaSyDp39kg5fDCh-WnF2DmhBT4-yYVoVO3HVg';
const CENTER = {lat: 55.751244, lng: 37.618423};

class Map extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired,
    onUpdateMarkerPosition: PropTypes.func.isRequired,
  };

  state = {

  };
  markers = [];
  map = null;
  infoWindow = null;
  path = null;

  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadJS(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`);
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEqual(this.props.markers, nextProps.markers) === false) {
      this._renderMarkers(nextProps.markers);
    }
  }

  get center() {
    return {
      lat: this.map.center.lat(),
      lng: this.map.center.lng()
    }
  }

  initMap() {
    this.map = new window.google.maps.Map(this.mapContainer, {
      center: CENTER,
      zoom: 16
    });
    this.infoWindow = new window.google.maps.InfoWindow();
  }

  _cleanMarkers() {
    if (!this.map) return;
    this.markers.forEach((marker) => {
      marker.setMap(null);
      window.google.maps.event.clearListeners(marker, 'click');
      window.google.maps.event.clearListeners(marker, 'drag');
      window.google.maps.event.clearListeners(marker, 'dragend');
    });
    this.markers = [];
  }

  _renderMarkers(markers) {
    if (!this.map) return;
    const { onUpdateMarkerPosition } = this.props;
    this._cleanMarkers();
    for (let idx in markers) {
      const marker = markers[idx];
      const newMarker = new window.google.maps.Marker({
        position: marker.position,
        map: this.map,
        title: marker.name,
        draggable: true,
      });
      newMarker.addListener('click', (e) => {
        this.infoWindow.setContent(marker.name);
        this.infoWindow.open(this.map, newMarker);
      });
      newMarker.addListener('drag', (e) => {
        this._renderPath();
      });
      newMarker.addListener('dragend', (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        onUpdateMarkerPosition(idx, {lat, lng});
      });
      this.markers.push(newMarker);
    }
    this._renderPath();
  }

  _renderPath() {
    if (!this.map) return;
    let path = [];
    this.markers.forEach((marker) => {
      const lat = marker.position.lat();
      const lng = marker.position.lng();
      path.push({lat, lng});
    });
    if (!this.path) {
      this.path = new window.google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });
      this.path.setMap(this.map);
    } else {
      this.path.setPath(path);
    }
  }

  render() {
    return (
      <div className='map' ref={(el) => this.mapContainer = el}></div>
    )
  }
}

export default Map;
