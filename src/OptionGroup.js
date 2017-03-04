import React, { Component, PropTypes } from 'react';
import { PREFIX, styles } from './index';

export default class OptionGroup extends Component {

  static propTypes = {
    indexPath: PropTypes.shape({
      section: PropTypes.number,
      row: PropTypes.number,
    }),
    label: PropTypes.string,
    value: PropTypes.string,
  }

  render() {
    const { label } = this.props;

    return (
      <div
        className={`${PREFIX}-option`}
        style={styles.optionGroup}
      >
        <span style={styles.optionGroupLabel}>{label}</span>
        {this.props.children}
      </div>
    );
  }
}
