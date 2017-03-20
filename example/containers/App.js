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
    valueCustomRender: '',
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
      valueHero,
      valueMultiple,
      valueCustomRender,
      valueCountry,
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
          disabled
          value={valueHero}
          options={dotaHeroes}
          onChange={value => this.handleChange('valueHero', value)}
        />

        <h2>Multiple</h2>
        <Select
          multiple
          value={valueMultiple}
          options={[
            { value: 'M', label: 'Male' },
            { value: 'F', label: 'Female' },
            { value: 'G', label: 'Gay' },
            { value: 'T', label: 'Tom' },
          ]}
          onChange={value => this.handleChange('valueMultiple', value)}
        />

      <h2>CustomRenderOption (Dota2 Heroes)</h2>
        <Select
          value={valueCustomRender}
          options={dotaHeroes}
          onChange={value => this.handleChange('valueCustomRender', value)}
          customRenderOption={(option) =>
            <div>
              <img src={`http://cdn.dota2.com/apps/dota2/images/heroes/${option.value}_sb.png`} width="50" style={{ marginRight: 5 }} />
              {option.label}
            </div>
          }
        />

        <h2>Large DataSet (Countries)</h2>
        <Select
          value={valueCountry}
          options={countriesOptions}
          onChange={value => this.handleChange('valueCountry', value)}
        />

        <h2>Custom Input</h2>
        <Select
          disabled
          value={valueHero}
          options={dotaHeroes}
          customRenderInput={() => 
            <input type="text" defaultValue="pcious" />
          }
          onChange={value => this.handleChange('valueHero', value)}
        />

      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi hic eos quasi, odit ducimus harum necessitatibus fugiat error dolores quis ipsum voluptatum asperiores modi sit eius, possimus atque reiciendis, blanditiis.</h1>
      </div>
    );
  }
};
