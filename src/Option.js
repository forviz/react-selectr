import React, { Component, PropTypes } from 'react';
import { PREFIX } from './index';
import { pureRender } from './utils';

class Option extends Component {

  static propTypes = {
    index: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.string,
    isFocus: PropTypes.bool,

    onFocus: PropTypes.func,
  }

  // Do focus option when mouse enter
  handleMouseEnter = (event) => {
    this.props.onFocus(this.props.index);
  }

  // MouseDown for mouse & TouchStart for touch devices
  // set dragging to false, back to normal.
  handleMouseDown = (e) => { this.dragging = false; this.pressing = true; }
  handleTouchStart = (e) => { this.handleMouseDown(e.touches[0]); }

  // MouseMove for mouse & TouchMove for touch devices
  // If start moving while pressing, set dragging = true;
  handleMouseMove = (e) => { if (this.pressing) { this.dragging = true; } }
  handleTouchMove = (e) => { this.handleMouseMove(e.touches[0]); }

  // MouseUp for mouse & TouchEnd for touch devices
  // If mouseUp/TouchEnd if user was draggin then not fire handleSelectOption;
  handleMouseUp = (e) => {
    this.pressing = false;
    if(this.dragging) return;

    // TODO: Not sure why, but this prevent double selectOption from touch devices
    e.preventDefault();
		e.stopPropagation();

    this.handleSelectOption(e);
  }
  handleTouchEnd = (e) => {
    this.handleMouseUp(e);
  }

  handleSelectOption = (e) => {
    this.props.onSelect(this.props.value);
  }

  render() {
    const { label, isFocus } = this.props;

    return (
      <div
        className={`${PREFIX}-option ${isFocus && 'isFocus'}`}
        role="option"
        onMouseEnter={this.handleMouseEnter}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        onMouseMove={this.handleMouseMove}
        onTouchMove={this.handleTouchMove}
        onMouseUp={this.handleMouseUp}
        onTouchEnd={this.handleTouchEnd}
      >{label}</div>
    );
  }
}

export default pureRender(Option);
