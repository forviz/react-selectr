import React, { Component, PropTypes } from 'react';

export default class Option extends Component {

  static propTypes = {
    indexPath: PropTypes.shape({
      section: PropTypes.number,
      row: PropTypes.number,
    }),
    prefix: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  }

  handleClickOption = (e) => {
    this.props.onSelect(this.props.value);
  }

  render() {
    const { prefix, label } = this.props;
    return (
      <div
        className={`${prefix}-option`}
        onClick={this.handleClickOption}
      >{label}</div>
    );
  }
}
