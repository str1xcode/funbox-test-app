import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';

class Item extends Component {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    marker: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired,
  };

  static displayName = 'MarkersListItem';

  render() {
    const {index, marker, onDelete, isDragging, connectDragSource, connectDropTarget} = this.props;
    return connectDragSource(
      connectDropTarget(
        <li className='markers-list__item'>
          <span className='item__name'>{marker.name}</span>
          <a className='item__delete' onClick={() => onDelete(index)}>
            &times;
          </a>
        </li>
      )
    )
  }
}

const markerSource = {
  beginDrag(props) {
    return {
      index: props.index
    }
  },
};

const markerTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
    props.onMove(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
};


const _dropTarget = DropTarget('marker', markerTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}));
const _dragSource = DragSource('marker', markerSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}));

export default _dropTarget(_dragSource(Item));
