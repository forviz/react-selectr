import React, { Component, PropTypes } from 'react';
import { PREFIX, styles } from './index';
import { pureRender } from './utils';

 class Value extends Component {

  static propTypes = {
    onDelete: PropTypes.func,
    value: PropTypes.string,
  }

  renderValueItem = () => {
    const { onDelete, value } = this.props;
    const isMultiValue = onDelete;
    if (isMultiValue) {
      return (
        <div className={`${PREFIX}-value-item`}>
          <span className={`${PREFIX}-value-delete`} onClick={() => onDelete(value)}>×</span>
          <span className={`${PREFIX}-value`}>{this.props.children}</span>
        </div>
      )
    }
    return this.props.children;
  }

  render() {
    return (
      <div className={`${PREFIX}-value-wrap`}>
        {this.renderValueItem()}
      </div>
    );
  }
}

export default pureRender(Value)