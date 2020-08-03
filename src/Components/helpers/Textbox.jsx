import React from "react";
import "./box.css";

export default class Textbox extends React.Component {
  checkHeight() {
    let value = 45;
    if (this.props.height) {
      value = this.props.height;
    }
    return value;
  }
  maxLengthCheck = object => {
    if (this.props.maxCharacters)
      if (object.target.value.length > object.target.maxLength) {
        object.target.value = object.target.value.slice(
          0,
          object.target.maxLength
        );
      }
  };
  maxRowCheck = object => {
    let textarea = object.target;
    let previous_height = textarea.style.height,
      lines;
    textarea.style.height = 0;
    lines = parseInt(
      textarea.scrollHeight /
        parseInt(getComputedStyle(textarea).lineHeight, 10),
      10
    );
    textarea.style.height = previous_height;
    if (lines > 5)
      object.target.value = object.target.value.slice(
        0,
        object.target.value.length - 1
      );
  };
  minLengthCheck = object => {
    if (object.target.value.length === 0) {
      object.target.value = this.props.default;
    }
  };
  minMaxCheck = object => {
    if (this.props.max) {
      if (object.target.value > parseFloat(object.target.max, 10)) {
        object.target.value = parseFloat(object.target.max, 10);
      }
    }
    if (this.props.min) {
      if (object.target.value < parseFloat(object.target.min, 10)) {
        object.target.value = parseFloat(object.target.min, 10);
      }
    }
  };
  addToState(value, type) {
    this.props.fetchData({ [type]: value });
  }
  componentDidMount() {
    this.props.fetchData({ [this.props.defaultValue]: this.props.default });
  }
  checkForSingleLine() {
    if (this.props.singleLine)
      if (this.props.type)
        return (
          <input
            className="InputBlock"
            type={this.props.type}
            defaultValue={this.props.default}
            maxLength={this.props.maxCharacters}
            min={this.props.min}
            max={this.props.max}
            onInput={object => {
              this.minLengthCheck(object);
              this.maxLengthCheck(object);
            }}
            onBlur={object => {
              this.minMaxCheck(object);
              this.addToState(
                parseFloat(object.target.value, 10),
                this.props.defaultValue
              );
            }}
            style={{
              height: this.checkHeight()
            }}
          />
        );
      else
        return (
          <input
            className="InputBlock"
            type="text"
            onInput={object => {
              this.minLengthCheck(object);
              this.addToState(object.target.value, this.props.defaultValue);
            }}
            defaultValue={this.props.default}
            maxLength={this.props.maxCharacters}
            minLength={this.props.minLength}
            style={{
              height: this.checkHeight()
            }}
          />
        );
    else
      return (
        <textarea
          className="InputBlock"
          type="text"
          defaultValue={this.props.default}
          onInput={object => {
            this.maxRowCheck(object);
            this.minLengthCheck(object);
            this.addToState(object.target.value, this.props.defaultValue);
          }}
          minLength={this.props.minLength}
          style={{
            height: this.checkHeight()
          }}
        />
      );
  }
  render() {
    return (
      <div
        className="TextBoxContainer"
        style={{
          height: this.checkHeight() + 30,
          left: this.props.left,
          right: this.props.left,
          top: this.props.top
        }}
      >
        <span className="InputText">{this.props.text}</span>
        {this.checkForSingleLine()}
      </div>
    );
  }
}
