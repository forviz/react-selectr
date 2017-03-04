import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default (WrapComponent) => {
  return class pureRender extends Component {

    shouldComponentUpdate(nextProps, nextState) {
      return shallowCompare(this, nextProps, nextState);
    }

    render() {
      return (<WrapComponent {...this.props} />);
    }
  }
}
