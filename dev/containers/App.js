import React, { Component } from 'react';
import Select from '../../src';
import _ from 'lodash';

import countries from './countries';

const options = _.map(countries, item => {
  return {
    label: item.country,
    options: item.states,
  }
});

export default class App extends Component {

  state = {
    value: '',
  }

  handleChange = (value) => {
    this.setState({
      value,
    })
  }

  render() {
    const { value } = this.state;
    return (
      <div className="container">
        <h1>React-selectr</h1>
        <Select
          value={value}
          options={options}
          onChange={this.handleChange}
        />
      </div>
    );
  }
};
