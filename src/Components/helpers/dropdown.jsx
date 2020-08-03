import React from "react";
import Select from "react-select";
import "./box.css";

export default class CustomDrop extends React.Component {
  constructor(props) {
    super(props);
    this.options = this.optionify(this.props.options);
    this.state = {
      selected: this.optionify([this.props.default])[0]
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange = selected => {
    //console.log(selected);
    this.setState({
      selected: selected
    });
    this.props.fetchData({ [this.props.defaultValue]: selected.label });
  };
  componentDidMount() {
    console.log(this.state.selected);
    this.props.fetchData({ [this.props.defaultValue]: this.props.default });
  }
  optionify(thing) {
    let arr = [];
    thing.forEach(option => {
      arr.push({
        value: option,
        label: option
        //className: "option"
      });
    });
    //console.log(arr);
    return arr;
  }
  render() {
    return (
      <div
        style={{
          height: 75
        }}
      >
        <span
          className="InputText"
          style={{ left: 15, right: 15, top: this.props.top }}
        >
          {this.props.text}
        </span>
        <Select
          styles={{
            control: base => ({
              ...base,
              backgroundColor: "#ededed",
              border: "none",
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              outline: "none",
              left: 15,
              width: 205,
              height: 45,
              top: this.props.top + 30
            }),
            option: (provided, state) => ({
              ...provided,
              color: "#000000",
              backgroundColor: state.isSelected ? "#dbdbdb" : "#ededed",
              height: 45,
              display: "flex",
              textAlign: "center",
              fontWeight: "normal",

              alignItems: "center",
              flexDirection: "column",
              "&:hover": {
                backgroundColor: "#f5f5f5"
              }
            }),
            dropdownIndicator: provided => ({
              ...provided,
              color: "black"
            }),
            indicatorSeparator: provided => ({
              ...provided,
              backgroundColor: "#777575"
            }),
            noOptionsMessage: provided => ({
              ...provided,
              color: "#777575",
              fontWeight: "bold"
            }),
            menuItems: () => ({
              color: "#777575"
            }),
            valueContainer: provided => ({
              ...provided,
              fontFamily: "Raleway",
              fontWeight: "500"
            }),
            menu: provided => ({
              ...provided,
              backgroundColor: "#ededed",
              border: "none",
              left: 15,
              width: 205,
              top: this.props.top + 65,
              borderRadius: 0,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5
            })
          }}
          options={this.options}
          onChange={this.onChange}
          value={this.state.selected}
          defaultValue={this.state.selected}
          isSearchable={false}
        />
      </div>
    );
  }
}
