import React, { Component, PropTypes } from 'react';
import { PREFIX } from './index';
import { pureRender } from './utils';

class Option extends Component {

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

    return (
      <div
        className={`${PREFIX}-option ${isFocus && 'isFocus'}`}
        onClick={this.handleClickOption}
      >{label}</div>
    );
  }
}

export default pureRender(Option);