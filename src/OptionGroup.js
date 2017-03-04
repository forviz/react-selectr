import React, { Component, PropTypes } from 'react';
import { PREFIX } from './index';
import { pureRender } from './utils';

class OptionGroup extends Component {

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
        className={`${PREFIX}-optionGroup`}
      >
        <span className={`${PREFIX}-optionGroupLabel`}>{label}</span>
        {this.props.children}
      </div>
    );
  }
}

export default pureRender(OptionGroup);