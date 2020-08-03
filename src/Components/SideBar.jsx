import React from "react";
import "./sidebar.css";
import { ReactComponent as File } from "./images/filesIcon.svg";
import { ReactComponent as Github } from "./images/gitIcon.svg";
import { ReactComponent as Settings } from "./images/settingIcon.svg";
import { ReactComponent as Plugin } from "./images/pluginIcon.svg";
import FileInfo from "./sideExtensions/FileInfo";
import Git from "./sideExtensions/Github";
import Set from "./sideExtensions/Settings";
import Plug from "./sideExtensions/Plugin";

export default class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this._ismounted = false;
    this.data = {};
    this.state = {
      currentstate: false,
      type: null,
      hoverType: null,
      iconColor: ["#d8d8d8", "#d8d8d8", "#d8d8d8", "#d8d8d8"],
      buttonColors: ["#2c86b8", "#2c86b8", "#2c86b8", "#2c86b8"],
      div: <div />
    };
    this.onClick = this.onClick.bind(this);
  }

  getBotDataFromFile = json => {
    let previous = this.data;
    let data = { ...previous, ...json };
    this.data = data;
    this.props.fetchData({ ...data });
  };

  componentDidMount() {
    this._isMounted = true;
    this.props.fetchData(this.state.data);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  onClick(type) {
    if (this._isMounted)
      if (this.state.type !== type) {
        if (type === "fileinfo") {
          if (this.state.type !== type)
            this.setState({
              currentstate: true,
              type: "fileinfo",
              buttonColors: ["#5899BD", "#2c86b8", "#2c86b8", "#2c86b8"],
              div: (
                <FileInfo
                  className="fileinfo"
                  fetchData={this.getBotDataFromFile}
                  data={this.props.data}
                />
              )
            });
        }
        if (type === "github") {
          if (this.state.type !== type)
            this.setState({
              currentstate: true,
              type: "github",
              buttonColors: ["#2c86b8", "#5899BD", "#2c86b8", "#2c86b8"],
              div: (
                <Git
                  className="git"
                  fetchData={this.getBotDataFromFile}
                  data={this.props.data}
                />
              )
            });
        }
        if (type === "settings") {
          if (this.state.type !== type)
            this.setState({
              currentstate: true,
              type: "settings",
              buttonColors: ["#2c86b8", "#2c86b8", "#5899BD", "#2c86b8"],
              div: (
                <Set
                  className="set"
                  fetchData={this.getBotDataFromFile}
                  data={this.props.data}
                />
              )
            });
        }
        if (type === "packages") {
          if (this.state.type !== type)
            this.setState({
              currentstate: true,
              type: "packages",
              buttonColors: ["#2c86b8", "#2c86b8", "#2c86b8", "#5899BD"],
              div: (
                <Plug
                  fetchData={this.getBotDataFromFile}
                  data={this.props.data}
                />
              )
            });
        }
      } else {
        this.setState({
          currentstate: false,
          type: null,
          buttonColors: ["#2c86b8", "#2c86b8", "#2c86b8", "#2c86b8"],
          div: <div />
        });
      }
  }

  hoverToggle = (number, color) => {
    let x = this.state.iconColor;
    x.splice(number, 1, color);
    this.setState({
      iconColor: x
    });
  };
  makeBGSmall() {
    if (this.props.small) return 68;
    else return 82;
  }
  makeIMGSmall(dim) {
    if (this.props.small) return dim * 0.82926829268;
    else return dim;
  }
  render() {
    return (
      <div className="SideBar">
        <div className="Compressed" style={{ width: this.makeBGSmall() }}>
          <div
            className="Info"
            onMouseEnter={() => {
              this.hoverToggle(0, "#EDEDED");
            }}
            onMouseLeave={() => {
              this.hoverToggle(0, "#d8d8d8");
            }}
            onClick={() => {
              this.onClick("fileinfo");
            }}
            style={{
              backgroundColor: this.state.buttonColors[0],
              width: this.makeBGSmall(),
              height: this.makeBGSmall(),
              top: this.makeBGSmall() * 0
            }}
          >
            <span>
              <File
                stroke={this.state.iconColor[0]}
                fill={this.state.iconColor[0]}
                width={this.makeIMGSmall(30)}
              />
            </span>
          </div>
          <div
            className="Github"
            onClick={() => {
              this.onClick("github");
            }}
            onMouseEnter={() => {
              this.hoverToggle(1, "#EDEDED");
            }}
            onMouseLeave={() => {
              this.hoverToggle(1, "#d8d8d8");
            }}
            style={{
              backgroundColor: this.state.buttonColors[1],
              width: this.makeBGSmall(),
              height: this.makeBGSmall(),
              top: this.makeBGSmall() * 1
            }}
          >
            <Github
              stroke={this.state.iconColor[1]}
              width={this.makeIMGSmall(39)}
            />
          </div>
          <div
            className="Settings"
            onClick={() => {
              this.onClick("settings");
            }}
            onMouseEnter={() => {
              this.hoverToggle(2, "#EDEDED");
            }}
            onMouseLeave={() => {
              this.hoverToggle(2, "#d8d8d8");
            }}
            style={{
              backgroundColor: this.state.buttonColors[2],
              width: this.makeBGSmall(),
              height: this.makeBGSmall(),
              top: this.makeBGSmall() * 2
            }}
          >
            <Settings
              fill={this.state.iconColor[2]}
              width={this.makeIMGSmall(41)}
            />
          </div>
          <div
            className="Plugins"
            onClick={() => {
              this.onClick("packages");
            }}
            onMouseEnter={() => {
              this.hoverToggle(3, "#EDEDED");
            }}
            onMouseLeave={() => {
              this.hoverToggle(3, "#d8d8d8");
            }}
            style={{
              backgroundColor: this.state.buttonColors[3],
              width: this.makeBGSmall(),
              height: this.makeBGSmall(),
              top: this.makeBGSmall() * 3
            }}
          >
            <Plugin
              fill={this.state.iconColor[3]}
              width={this.makeIMGSmall(36)}
            />
          </div>
        </div>
        {this.state.currentstate ? (
          <div>
            <div
              className="unCompressed"
              style={{
                left: this.makeBGSmall()
              }}
            >
              {this.state.div}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
