import React from "react";
import "./Settings.css";
import Textbox from "../helpers/Textbox";
import CustomDrop from "../helpers/dropdown";

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.data = {};
  }

  getDataFromChild = json => {
    let previous = this.data;
    let data = { ...previous, ...json };
    this.data = data;
    this.props.fetchData({ ...data });
  };
  shouldComponentUpdate(nextProps) {
    const differentRender =
      this.props.data.renderer !== nextProps.data.renderer;
    const differentMin = this.props.data.minScale !== nextProps.data.minScale;
    const differentMax = this.props.data.maxScale !== nextProps.data.maxScale;
    const differentFont = this.props.data.fontSize !== nextProps.data.fontSize;
    const differentScroll = this.props.data.scroll !== nextProps.data.scroll;
    return (
      differentRender ||
      differentMin ||
      differentMax ||
      differentFont ||
      differentScroll
    );
  }
  render() {
    return (
      <div>
        <span className="sethead">Settings</span>
        {/* <div className="themes">
          <span className="themey">Themes</span>
          <Textbox
            text="Current Theme:"
            left={15}
            top={100}
            maxCharacters={15}
            singleLine={true}
            default="Stone"
          />
        </div> */}
        <div className="config">
          <span className="configy">Workspace</span>
          <CustomDrop
            options={["Thrasos", "Geras", "Zelos"]}
            text="Current Style: "
            top={100}
            defaultValue="renderer"
            default={this.props.data.renderer}
            fetchData={option => this.getDataFromChild(option)}
          />
        </div>
        <div className="textset">
          <span className="txtsettings">Text settings</span>
          <Textbox
            text="Text size:"
            left={15}
            top={230}
            type="number"
            singleLine={true}
            default={this.props.data.fontSize}
            min={10}
            max={25}
            defaultValue="fontSize"
            fetchData={object => {
              this.getDataFromChild(object);
            }}
          />
        </div>
        <div className="zomset">
          <span className="zoomset">Zoom settings</span>
          <CustomDrop
            options={["True", "False"]}
            text="Scrollable"
            top={370}
            defaultValue="scroll"
            default={this.props.data.scroll}
            fetchData={object => {
              this.getDataFromChild(object);
            }}
          />
          <Textbox
            text="Maximum scale:"
            left={15}
            top={460}
            type="number"
            singleLine={true}
            min={0.1}
            max={10}
            default={this.props.data.maxScale}
            defaultValue="maxScale"
            fetchData={object => {
              this.getDataFromChild(object);
            }}
          />
          <Textbox
            text="Minimum scale:"
            left={15}
            top={550}
            type="number"
            singleLine={true}
            min={0.1}
            max={10}
            default={this.props.data.minScale}
            defaultValue="minScale"
            fetchData={object => {
              this.getDataFromChild(object);
            }}
          />
        </div>
      </div>
    );
  }
}
