import React, { Component, Fragment } from 'react';
import InputMarker from '../../components/InputMarker';
import MarkersList from '../../components/MarkersList';
import Map from '../../components/Map';
import _ from 'lodash';
import './styles.css';

class App extends Component {
  state = {
    markers: []
  }

  _onAdd(name) {
    const { markers } = this.state;
    const center = this.map.center;
    const newMarker = {id: _.uniqueId('marker_'), name, position: center};
    this.setState({markers: [...markers, newMarker]});
  }

  _onDelete(idx) {
    const _markers = this.state.markers.slice();
    _markers.splice(idx, 1);
    this.setState({markers: _markers});
  }

  _onMove(dragIndex, hoverIndex) {
    const _markers = this.state.markers.slice();
    const _dragItem = _markers[dragIndex];
    _markers.splice(dragIndex, 1);
    _markers.splice(hoverIndex, 0, _dragItem);
    this.setState({markers: _markers});
  }

  _onUpdateMarkerPosition(idx, position) {
    let _markers = this.state.markers.slice();
    _markers[idx].position = position;
    this.setState({markers: _markers});
  }

  render() {
    const { markers } = this.state;
    return (
      <Fragment>
        <aside className='app__sidebar'>
          <InputMarker onAdd={this._onAdd.bind(this)} />
          <MarkersList markers={markers}
            onDelete={this._onDelete.bind(this)}
            onMove={this._onMove.bind(this)}
          />
        </aside>
        <Map
          markers={markers}
          ref={(el) => this.map = el}
          onUpdateMarkerPosition={this._onUpdateMarkerPosition.bind(this)}
        />
      </Fragment>
    );
  }
}

export default App;
