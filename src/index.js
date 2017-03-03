import React, { Component, PropTypes } from 'react';
import _pick from 'lodash/pick';
import _map from 'lodash/map';
import _find from 'lodash/find';

import OptionGroup from './OptionGroup';
import Option from './Option';

const prefix = 'rselectr';

const styles = {
  container: {
    border: '1px solid #ececec',
    'borderRadius': 4,
    padding: '6px 12px',
  }
}

class Select extends Component {

  static displayName = prefix;

  static propTypes = {
    // Options
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    searchable: PropTypes.bool,
    value: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    openOnFocus: PropTypes.bool,          // always open options menu on focus
    openAfterFocus: PropTypes.bool,

    // Events
    filterOption: PropTypes.func,   // function to filer an option
    filterOptions: PropTypes.func,  // function to filer options
    onChange: PropTypes.func,

    onInputChange: PropTypes.func,
    onInputKeydown: PropTypes.func,

  }

  static defaultProps = {
    disabled: false,
    searchable: true,
    openOnFocus: true,
    openAfterFocus: false,
    numSection: 1,
  }

  state = {
    isOpen: false,
    isFocused: false,
    isPseudoFocused: false,
  }

  /* Detect click Outside */
  _handleDetectClickOutside = (e) => {
    if (this.component.contains(e.target)) return;
    this.setState({ isOpen: false });
  }
  componentDidMount() { document.body.addEventListener('mousedown', this._handleDetectClickOutside) }
  componentWillUnmount() { document.body.removeEventListener('mousedown', this._handleDetectClickOutside) }
  /* End of Detect click Outside */


  handleClickOption = (value) => {

    this.setState({
      isOpen: false,
    });

    this.props.onChange(value);
  }

  handleOpenMenu = () => {
    this.setState({
      isOpen: true,
    });
    this.searchInput.focus();
  }

  handleCloseMenu = () => {
    this.setState({
      isOpen: false,
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

  renderSearchInput = () => {
    return (
      <div>
        <input
          type="text"
          ref={c => this.searchInput = c}
        />
      </div>
    );
  }

  renderOptionGroups = (options) => {
    return _map(options, (optgroup, groupIndex) => this.renderOptionGroup(optgroup, groupIndex));
  }

  renderOptionGroup = (optgroup, groupIndex) => {
    const { options, label } = optgroup;
    return (
      <OptionGroup key={`optgroup-${label}-${groupIndex}`} label={label}>
        {_map(options, (option, index) => this.renderOption(option, index))}
      </OptionGroup>
    );
  }

  renderOption = (option, index) => {
    const _label = option.label || option;
    const _value = option.value || option;
    return (
      <Option
        key={`option-${_value}-${index}`}
        index={index}
        prefix={prefix}
        label={_label}
        value={_value}
        onSelect={this.handleClickOption}
      />
    );
  }

  render() {
    const { value, options } = this.props;
    const selectedOption = _find(options, option => option.value === value);
    const { isOpen } = this.state;

    return (
      <div
        className={`${prefix}-container`}
        ref={c => this.component = c}
        style={styles.container}
      >
        <div
          className={`${prefix}-control`}
          onMouseDown={this.handleMouseDown}
        >{value || 'Select a country'}</div>
        {
          isOpen &&
            <div className={`${prefix}-menu`}>
              { this.renderSearchInput() }
              { this.renderOptionGroups(options) }
            </div>
        }
      </div>
    )
  }
};

export default Select;
