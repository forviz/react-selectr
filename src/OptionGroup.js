import React, { Component, PropTypes } from 'react';

export default class OptionGroup extends Component {

  static propTypes = {
    indexPath: PropTypes.shape({
      section: PropTypes.number,
      row: PropTypes.number,
    }),
    prefix: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
  }

  render() {
    const { prefix, label } = this.props;
    return (
      <div
        className={`${prefix}-option`}
      >
        <span>{label}</span>
        {this.props.children}
      </div>
    );
  }
}
