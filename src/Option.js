import React, { Component, PropTypes } from 'react';
import { styles } from './index';

export default class Option extends Component {

  static propTypes = {
    indexPath: PropTypes.shape({
      section: PropTypes.number,
      row: PropTypes.number,
    }),
    prefix: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    isFocus: PropTypes.bool,
  }

  handleClickOption = (e) => {
    this.props.onSelect(this.props.value);
  }

  render() {
    const { prefix, label, isFocus } = this.props;

    const style = {
      ...styles.option,
      ...isFocus && styles.optionWithFocus
    };

    return (
      <div
        className={`${prefix}-option`}
        style={style}
        onClick={this.handleClickOption}
      >{label}</div>
    );
  }
}
