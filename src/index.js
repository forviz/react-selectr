import React, { Component, PropTypes } from 'react';
import _pick from 'lodash/pick';
import _map from 'lodash/map';
import _find from 'lodash/find';

import OptionGroup from './OptionGroup';
import Option from './Option';

// Utils
import isOptionGroup from './utils/isOptionGroup';

const prefix = 'rselectr';

export const styles = {
  container: {

  },
  control: {
    position: 'relative',
    border: '1px solid #ececec',
    borderRadius: 4,
    padding: '6px 12px',
  },
  searchInputContainer: {
    borderBottom: '1px solid #ccc',
  },
  searchInput: {
    width: '100%',
    padding: '6px 12px',
    borderRadius: 2,
    outline: 'none',
    border: '1px solid #ececec',
    boxShadow: 'none',
  },
  searchInputHidden: {
    display: 'none',
  },
  menu: {
    padding: 8,
    border: '1px solid #ececec',
    borderRadius: 4,
    position: 'absolute',
    zIndex: 1,
    background: '#fff',
    width: '100%',
  },
  option: {
    padding: '6px 12px',
  },
  optionWithFocus: {
    background: '#5897fb',
  },
  optionGroup: {
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
  componentDidMount() { document.addEventListener('mousedown', this._handleDetectClickOutside) }
  componentWillUnmount() { document.removeEventListener('mousedown', this._handleDetectClickOutside) }
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
  }

  handleCloseMenu = () => {
    this.setState({
      isOpen: false,
    });
  }

  handleKeyDown = (event) => {
    console.log('handleKeyDown', event.keyCode);
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
      focusAtIndex: targetIndex,
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
      <div className={`${prefix}-searchInput-wrapper`} style={styles.searchInputContainer}>
        <input
          type="text"
          autoFocus
          style={styles.searchInput}
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
        {this.renderOptions(options)}
      </OptionGroup>
    );
  }

  renderOptions = (options) => {
    return _map(options, (option, index) => this.renderOption(option, index));
  }

  renderOption = (option, index) => {
    const _label = option.label || option;
    const _value = option.value || option;
    const { focusAtIndex } = this.state;
    return (
      <Option
        key={`option-${_value}-${index}`}
        isFocus={focusAtIndex === index}
        index={index}
        prefix={prefix}
        label={_label}
        value={_value}
        onSelect={this.handleClickOption}
      />
    );
  }

  render() {
    const { value, options, placeholder } = this.props;
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
          style={styles.control}
          onKeyDown={this.handleKeyDown}
					onMouseDown={this.handleMouseDown}
        >
          {value || placeholder}
        </div>
        {
          isOpen &&
            <div className={`${prefix}-menu`} style={styles.menu}>
              { this.renderSearchInput() }
              { isOptionGroup(options) ? this.renderOptionGroups(options) : this.renderOptions(options) }
            </div>
        }
      </div>
    )
  }
};

export default Select;
