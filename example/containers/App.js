import React, { Component } from 'react';
import Select from 'react-selectr';
import '../../src/scss/react-selectr.scss';
import _ from 'lodash';

import countries from './countries';
import dotaHeroes from './data/dota-heroes';

const countriesOptions = countries.map((item) => {
  return {
    label: item.country,
    options: item.states,
  }
});

const countriesOptions2 = _.reduce(countries, (accumulator, item, index) => {
  const states = item.states.map((state) => {
    return {
      label: state,
      value: state,
    };
  });
  return [ ...accumulator, ...states];
}, []);

export default class App extends Component {

  state = {
    value1: '',
    valueHero: '',
    valueMultiple: '',
    valueCountry: '',
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    })
  }

  render() {
    const {
      value1,
      value2,
      valueMultiple,
    } = this.state;

    return (
      <div className="container">
        <h1>React-selectr</h1>

        <h2>Normal</h2>
        <Select
          value={value1}
          options={[
            { value: 'M', label: 'MALE' },
            { value: 'F', label: 'FEMALE' },
          ]}
          onChange={value => this.handleChange('value1', value)}
        />


      <h2>OptGroup (Dota2 Heroes)</h2>
        <Select
          value={valueHero}
          options={dotaHeroes}
          onChange={value => this.handleChange('valueHero', value)}
        />

        <h2>Multiple</h2>
        <Select
          multiple
          extractValueOption
          value={valueMultiple}
          options={[
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
            { value: 'G', label: 'Gay' },
            { value: 'T', label: 'Tom' },
          ]}
          onChange={value => this.handleChange('valueMultiple', value)}
        />

      <h2>Large DataSet (Countries)</h2>
        <Select
          value={valueCountry}
          options={countriesOptions}
          onChange={value => this.handleChange('valueCountry', value)}
        />

      </div>
    );
  }
};
