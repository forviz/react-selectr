import React, { Component, PropTypes } from 'react';
import { PREFIX } from './index';
import { pureRender } from './utils';

const defaultRenderOptionGroupLabel = (label) => <span>{label}</span>;

class OptionGroup extends Component {

  static propTypes = {
    label: PropTypes.string,
    customRenderOptionGroupLabel: PropTypes.func,
  }

  render() {
    const { label } = this.props;
    const optionGroupLabelRenderer = this.props.customRenderOptionGroupLabel || defaultRenderOptionGroupLabel;

    return (
      <div
        className={`${PREFIX}-optionGroup`}
      >
        <div className={`${PREFIX}-optionGroupLabel`}>{optionGroupLabelRenderer(label)}</div>
        {this.props.children}
      </div>
    );
  }
}

export default pureRender(OptionGroup);
