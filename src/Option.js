import React, { Component, PropTypes } from 'react';
import { PREFIX, styles } from './index';

export default class Option extends Component {

  static propTypes = {
    indexPath: PropTypes.shape({
      section: PropTypes.number,
      row: PropTypes.number,
    }),
    label: PropTypes.string,
    value: PropTypes.string,
    isFocus: PropTypes.bool,
  }

  handleClickOption = (e) => {
    this.props.onSelect(this.props.value);
  }

  render() {
    const { label, isFocus } = this.props;

    const style = {
      ...styles.option,
      ...isFocus && styles.optionWithFocus
    };

    return (
      <div
        className={`${PREFIX}-option`}
        style={style}
        onClick={this.handleClickOption}
      >{label}</div>
    );
  }
}
