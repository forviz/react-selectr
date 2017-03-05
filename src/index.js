import React, { Component, PropTypes } from 'react';
import _pick from 'lodash/pick';
import _map from 'lodash/map';
import _find from 'lodash/find';
import _get from 'lodash/get';

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
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
      groupIndex: PropTypes.number,
    })),
    groups: PropTypes.arrayOf(PropTypes.string),
    placeholder: PropTypes.string,
    openOnFocus: PropTypes.bool,          // always open options menu on focus
    openAfterFocus: PropTypes.bool,

    // Events
    filterOption: PropTypes.func,         // function to filer an option
    filterOptions: PropTypes.func,        // function to filer options
    onChange: PropTypes.func,

    onInputChange: PropTypes.func,
    onInputKeydown: PropTypes.func,

  }

  static defaultProps = {
    disabled: false,
    searchable: true,
    openOnFocus: true,
    openAfterFocus: false,
    placeholder: 'Select...',
  }

  state = {
    isOpen: false,
    isFocused: false,
    isPseudoFocused: false,
    focusAtIndex: 0, // indexToFocus
  }

  /* Detect click Outside */
  _handleDetectClickOutside = (e) => {
    if (this.component.contains(e.target)) return;
    this.setState({ isOpen: false });
  }

  componentDidMount() {
    document.addEventListener('mousedown', this._handleDetectClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleDetectClickOutside)
  }
  /* End of Detect click Outside */

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

      const multipleValueArray = getValueArray(value);
      const multipleValueCurrent = [...multipleValueArray, ...currentValue];
      const multipleValueString = getValueString(multipleValueCurrent);
      const multipleValueArrayOption = multipleValueCurrent.map(mv => getValueSelected(options, mv));
      _value = extractValueOption ? multipleValueArrayOption : multipleValueString;
      onChange(_value);

    } else {

      _value = extractValueOption ? getValueSelected(options, currentValue) : currentValue;
      onChange(_value);

      /* Close options */
      this.setState({
        isOpen: false,
      });

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
    this.setState({
      isOpen: false,
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
    console.log('focusAtOption', toIndex);
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

    const multipleValueArray = getValueArray(value);
    const multipleValueArrayOption = multipleValueArray.map(mv => getValueSelected(options, mv));
    const valueOption = v => v.value !== valueToDelete;
    const valueString = v => v !== valueToDelete;
    const _value = extractValueOption ? multipleValueArrayOption.filter(valueOption) : getValueString(multipleValueArray.filter(valueString));
    onChange(_value);
  }

  renderSearchInput = () => {
    return (
      <div className={`${PREFIX}-searchInput-wrapper`}>
        <input
          className={`${PREFIX}-searchInput`}
          type="text"
          autoFocus
          ref={c => this.searchInput = c}
        />
      </div>
    );
  }

  // renderOptionGroups = (options) => {
  //   return _map(options, (optgroup, groupIndex) => this.renderOptionGroup(optgroup, groupIndex));
  // }
  //
  // renderOptionGroup = (optgroup, groupIndex) => {
  //   const { options, label } = optgroup;
  //   return (
  //     <OptionGroup key={`optgroup-${label}-${groupIndex}`} label={label}>
  //       {this.renderOptions(options)}
  //     </OptionGroup>
  //   );
  // }

  renderOptions = (groups, options) => {
    return _map(groups, (label, groupIndex) => {
      const groupOptions = _.filter(options, option => option.groupIndex === groupIndex);
      return (
        <OptionGroup key={`optgroup-${label}-${groupIndex}`} label={label}>
          { _map(groupOptions, option => this.renderOption(option)) }
        </OptionGroup>
      );
    })
    // return _map(options, (option, index) => this.renderOption(option, index));
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

    return (<Value value={getOptionValue(value)}>{ this.renderValueLabel(options, getOptionValue(value)) }</Value>);
  }

  render() {

    const {
      isOpen,
    } = this.state;

    const {
      value,
      groups,
      options,
      placeholder,
      multiple,
    } = this.props;

    return (
      <div className={`${PREFIX}-container`} ref={c => this.component = c}>
        <div
          className={`${PREFIX}-control`}
          tabIndex={0}
          onMouseDown={this.handleMouseDown}
        >
          {value && this.renderValue(options, value, multiple) || placeholder}
        </div>
        {
          isOpen &&
            <div className={`${PREFIX}-menu`} onKeyDown={this.handleKeyDown}>
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
