import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Item from './Item';

import './styles.css';

class MarkersList extends Component {

  static propTypes = {
    markers: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
  };

  render() {
    const { markers, onDelete, onMove } = this.props;
    return(
      <ul className='markers-list'>
        {markers.map((marker, idx) => (
          <Item key={idx}
            index={idx}
            marker={marker}
            onDelete={() => onDelete(idx)}
            onMove={(dragIndex, hoverIndex) => onMove(dragIndex, hoverIndex)}
          />
        ))}
      </ul>
    )
  }
}

export default DragDropContext(HTML5Backend)(MarkersList);
