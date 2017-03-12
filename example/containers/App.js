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
    demoEventHookValue: '',
    demoEventHookMessage: '',
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
      demoEventHookValue,
      demoEventHookMessage,
    } = this.state;

    return (
      <div className="container">
        <h1>React-selectr</h1>
        <input type="text" />
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

        <h2>Event Hooks (Dota2 Heroes)</h2>
        <div>{demoEventHookMessage}</div>
        <Select
          value={demoEventHookValue}
          options={dotaHeroes}
          onFocus={() => { console.log('focus'); this.setState({ demoEventHookMessage: 'focus' }) }}
          onChange={value => this.handleChange('demoEventHookValue', value)}
          onBlur={() => { console.log('blur'); this.setState({ demoEventHookMessage: 'blur' }) }}
          onOpen={() => { console.log('open'); this.setState({ demoEventHookMessage: 'open' }) }}
          onClose={() => { console.log('close'); this.setState({ demoEventHookMessage: 'close' }) }}
          onInputChange={(value) => this.setState({ demoEventHookMessage: `inputChange ${value}` })}
          onInputKeyDown={(e) => this.setState({ demoEventHookMessage: `inputKeydown ${e.keyCode}` })}
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
