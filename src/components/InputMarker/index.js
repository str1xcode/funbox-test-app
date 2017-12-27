import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class InputMarker extends Component {
  static propTypes = {
    onAdd: PropTypes.func.isRequired,
  };

  _handleKeyDown(e) {
    const { onAdd } = this.props;
    if (e.key === 'Enter') {
      const name = this.input.value;
      if (name.length === 0) return;
      onAdd(name);
      this.input.value = '';
    }
  }

  render() {
    return (
      <input ref={(el) => this.input = el}
        className='input-marker'
        placeholder='Новая точка маршрута'
        // onInput={(e) => this._handleInput(e.target.value)}
        onKeyDown={this._handleKeyDown.bind(this)}
      />
    )
  }
};

export default InputMarker;
