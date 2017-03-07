import React, { Component, PropTypes } from 'react';
import { PREFIX } from './index';
import { pureRender } from './utils';

class OptionGroup extends Component {

  static propTypes = {
    label: PropTypes.string,
  }

  render() {
    const { label } = this.props;

    return (
      <div
        className={`${PREFIX}-optionGroup`}
      >
        {label !== '' && <span className={`${PREFIX}-optionGroupLabel`}>{label}</span>}
        {this.props.children}
      </div>
    );
  }
}

export default pureRender(OptionGroup);
