import React, { Component, PropTypes } from 'react';
import _pick from 'lodash/pick';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import _isEmpty from 'lodash/isEmpty';

import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';

import OptionGroup from './OptionGroup';
import Option from './Option';
import Value from './Value';

// Utils
import {
  mapOptions,
  mapOptionGroups,
  isOptionGroup,
  getOptionValue,
  getValueArray,
  getValueString,
  getValueSelected,
  defaultFilterOptions,
  getOptions,
} from './utils';

export const PREFIX = 'rselectr';

const enhance = compose(
  mapProps(props => {
    return {
      ...props,
      options: mapOptions(props.options),
      groups: mapOptionGroups(props.options),
    }
  }),
);

class Select extends Component {

  static displayName = PREFIX;

  static propTypes = {
    // Options
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    extractValueOption: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      groupIndex: PropTypes.number,
    })),
    optionPosition: PropTypes.string,             // dropdown | dropup
    groups: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    keepSearchValue: PropTypes.bool,

    // Events
    filterOption: PropTypes.func,                 // function to filer an option
    filterOptions: PropTypes.func,                // function to filer options
    onChange: PropTypes.func,

    onInputChange: PropTypes.func,
    onInputKeydown: PropTypes.func,

    customRenderInput: PropTypes.func,

  }

  static defaultProps = {
    value: '',
    disabled: false,
    searchable: true,
    placeholder: 'Select...',
    optionPosition: false,
    keepSearchValue: false,
  }

  state = {
    isOpen: false,
    focusAtIndex: 0,                                          // indexToFocus
    searchValue: '',                                          // searchValue for filter options
    optionPosition: this.props.optionPosition || 'dropdown',  // option position
  }

  /* Detect click Outside */
  _handleDetectClickOutside = (e) => {
    if (this.component.contains(e.target)) return;
    this.handleCloseMenu();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleDetectClickOutside)
    window.addEventListener('load', this.handleChangeOptionPosition)
    window.addEventListener('scroll', this.handleChangeOptionPosition)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleDetectClickOutside)
    window.removeEventListener('scroll', this.handleChangeOptionPosition)
  }
  /* End of Detect click Outside */

  handleChangeOptionPosition = () => {
    const hasPropOptionPosition = !this.props.optionPosition;                                     // check if has props optionPosition
    if (hasPropOptionPosition) {
      const windowHeight = window.innerHeight;                                                    // current window height
      const componentTop = this.component.getBoundingClientRect().top;                            // select component offset top
      const optionHeight = this.menuOption && this.menuOption.offsetHeight + 50 || 400;           // option component height
      const optionPosition = componentTop + optionHeight >= windowHeight ? 'dropup' : 'dropdown'; // option position
      this.setState({
        optionPosition: optionPosition,
      });
    }
  }
  
  handleSelectOption = (currentValue) => {
    const {
      multiple,
      options,
      extractValueOption,
      value,
      onChange,
    } = this.props;

    let _value = '';

    /* Multiple */
    if (multiple) {

      const multipleValue = [...getValueArray(value), ...currentValue]
      const multipleValueOption = multipleValue.map(mv => getValueSelected(options, mv));
      const multipleValueString = getValueString(multipleValue);
      _value = extractValueOption ? multipleValueOption : multipleValueString ;
      onChange(_value);

    } else {

      _value = extractValueOption ? getValueSelected(options, currentValue) : currentValue;
      onChange(_value);

      /* Close options */
      this.handleCloseMenu();

    }
  }

  handleSelectOptionAtIndex = (index) => {
    const option = this.props.options[index];
    this.handleSelectOption(getOptionValue(option));
  }

  handleOpenMenu = () => {
    this.setState({
      isOpen: true,
    });
  }

  handleCloseMenu = () => {
    const { keepSearchValue } = this.props;
    this.setState({
      isOpen: false,
      searchValue: keepSearchValue ? this.state.searchValue : '',
    });
  }

  handleSearchInputChange = (e) => {
    this.handleFilterOption(e);
  }

  handleFilterOption = (e) => {
    this.setState({
      searchValue: e.target.value,
    });
  }

  handleKeyDown = (event) => {
    if (this.props.disabled) return;

		if (typeof this.props.onInputKeyDown === 'function') {
			this.props.onInputKeyDown(event);
			if (event.defaultPrevented) {
				return;
			}
		}

		switch (event.keyCode) {

			case 38: // up
				this.focusAtOption(this.state.focusAtIndex - 1);
			  break;
			case 40: // down
				this.focusAtOption(this.state.focusAtIndex + 1);
			  break;
      case 13: // enter
				if (!this.state.isOpen) return;
				event.stopPropagation();
				this.handleSelectOptionAtIndex(this.state.focusAtIndex);
			  break;
			case 27: // escape
				if (this.state.isOpen) {
					this.handleCloseMenu();
					event.stopPropagation();
				}
			  break;
			default: return;
		}
		event.preventDefault();
	}

  focusAtOption = (toIndex) => {
    let _targetIndex;
    if (toIndex < 0) _targetIndex = 0;
    else if (toIndex > this.props.options.length - 1) _targetIndex = this.props.options.length - 1;
    else _targetIndex = toIndex;

    this.setState({
      focusAtIndex: _targetIndex,
    });
  }

  handleMouseDown = (event) => {
		// if the event was triggered by a mousedown and not the primary
		// button, or if the component is disabled, ignore it.
		if (this.props.disabled || (event.type === 'mousedown' && event.button !== 0)) {
			return;
		}

		if (event.target.tagName === 'INPUT') {
			return;
		}

		// prevent default event handlers
		event.stopPropagation();
		event.preventDefault();

    if (!this.state.isOpen) this.handleOpenMenu();
    else this.handleCloseMenu();
	}

  handleDeleteValue = (valueToDelete) => {
    const {
      multiple,
      extractValueOption,
      value,
      onChange,
      options,
    } = this.props;

    const multipleValue = getValueArray(value);
    const multipleValueOptions = multipleValue.map(mv => getValueSelected(options, mv)).filter(v => v.value !== valueToDelete);
    const multipleValueString = getValueString(multipleValue.filter(v => v !== valueToDelete));
    const _value = extractValueOption ? multipleValueOptions : multipleValueString;
    onChange(_value);

  }

  selectOptionsToRender = (options, searchValue, { searchable, filterOptions, filterOption }) => {
    if (!searchable) return options;
    if (filterOptions && _.isFunction(filterOptions)) return filterOptions(options, searchValue);
    if (filterOption && _.isFunction(filterOption)) return defaultFilterOptions(options, searchValue, filterOption);
    return defaultFilterOptions(options, searchValue);
  }

  renderSearchInput = () => {
    const { customRenderInput } = this.props;
    if ( typeof customRenderInput === 'function' ) return customRenderInput();
    return (
      <div className={`${PREFIX}-searchInput-wrapper`}>
        <input
          className={`${PREFIX}-searchInput`}
          type="text"
          autoFocus
          ref={c => this.searchInput = c}
          onChange={this.handleSearchInputChange}
        />
      </div>
    );
  }


  renderOptions = (groups, options) => {
    const { searchValue } = this.state;
    const filteredOptions = this.selectOptionsToRender(options, searchValue, this.props);

    return _map(groups, (label, groupIndex) => {
      const groupOptions = _filter(filteredOptions, option => option.groupIndex === groupIndex);
      if (groupOptions.length > 0) {
        return (
          <OptionGroup key={`optgroup-${label}-${groupIndex}`} label={label}>
            { _map(groupOptions, option => this.renderOption(option)) }
          </OptionGroup>
        );
      }

      return;
    });
  }

  renderOption = (option) => {
    const _label = option.label || option;
    const _value = option.value || option;
    const index = option.optionIndex;
    const { focusAtIndex } = this.state;
    return (
      <Option
        key={`option-${_value}-${index}`}
        isFocus={focusAtIndex === index}
        index={index}
        label={_label}
        value={_value}
        onFocus={this.focusAtOption}
        onSelect={this.handleSelectOption}
        on
      />
    );
  }

  renderValueLabel = (options, value) => {
    return _get(_find(options, option => option.value === value), 'label', '');
  }

  renderValue = (options, value, multiple) => {

    /* Value is Empty */
    if (_isEmpty(value)) return false

    /* Multiple */
    if (multiple) {
      const multipleValue = getValueArray(value);
      return multipleValue.map((v, i) =>
        <Value
          key={`${PREFIX}-${v}-${i}`}
          value={v}
          onDelete={this.handleDeleteValue}
        >
          { this.renderValueLabel(options, v) }
        </Value>
      )
    }

    /* Single */
    return (<Value value={getOptionValue(value)}>{ this.renderValueLabel(options, getOptionValue(value)) }</Value>);
  }

  render() {

    const {
      isOpen,
      optionPosition,
    } = this.state;

    const {
      value,
      groups,
      options,
      placeholder,
      multiple,
      disabled,
    } = this.props;
    console.log('state', this.state);
    return (
      <div className={`${PREFIX}-container`} ref={c => this.component = c}>
        <div
          className={`${PREFIX}-control ${isOpen ? 'isfocus' : ''} ${disabled ? 'isdisabled' : ''}`}
          tabIndex={0}
          onClick={this.handleMouseDown}
        >
          {this.renderValue(options, value, multiple) || placeholder}
        </div>
        {
          isOpen &&
          <div
            className={`${PREFIX}-menu ${optionPosition}`}
            ref={mo => this.menuOption = mo}
            onKeyDown={this.handleKeyDown}
          >
            { this.renderSearchInput() }
            <div className={`${PREFIX}-option-list`}>
              { this.renderOptions(groups, options)}
            </div>
          </div>
        }
      </div>
    )
  }
};

export default enhance(Select);
