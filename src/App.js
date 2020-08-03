import React from "react";
import "./styles.css";
import Sidebar from "./Components/SideBar";
import BlocklyDiv from "./Components/BlocklyTools/Blockly";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.mountedBlockly = true;
    this.state = {
      small: true,
      key: true,
      // deltaPosition: {
      //   x: 0,
      //   y: 0
      // },
      data: {
        description: "Does Cool Stuff",
        discord: true,
        fontSize: 15,
        gitLink: "https://github.com/",
        maxScale: 3,
        minScale: 0.3,
        name: "My Bot",
        reddit: false,
        renderer: "Thrasos",
        scroll: "False",
        version: 0.1,
        code: `const Discord = require('discord.js')\nconst client = new Discord.Client()\n\n`,
        xml: `<xml xmlns="https://developers.google.com/Blockly/xml" id="workspaceBlocks" style="display: none"><Block type="setup" id="xSh562M^2+@$ad}:f}uU" x="13" y="13" deletable="false"><field name="TOKEN"></field></Block></xml>`,
        upload: false
      }
    };
    this.editor = React.createRef();
  }
  remount = () => {
    this.setState({
      key: !this.state.key
    });
  };
  getDataFromAllChildren = data => {
    if (data) {
      if (this.state.data !== data) {
        let prev = this.state.data;
        console.log(data)
        this.setState({ data: { ...prev, ...data } });
      }
    }
  };
  // onResize = (event, { element, size, handle }) => {
  //   this.setState({ width: size.width, height: size.height });
  // };
  // fixDims() {
  //   if (window.innerWidth <= 1250 && !this.state.small) {
  //     this.setState({ small: true });
  //   }
  //   if (window.innerWidth >= 1250 && this.state.small) {
  //     this.setState({ small: false });
  //   }
  // }
  // componentDidMount() {
  //   this.fixDims();
  //   window.addEventListener("resize", this.fixDims.bind(this));
  // }
  // handleDrag = (e, ui) => {
  //   this.setState({
  //     deltaPosition: {
  //       x: this.state.deltaPosition.x + ui.deltaX,
  //       y: this.state.deltaPosition.x + ui.deltaY
  //     }
  //   });
  // };
  cutoff = () => {
    if (this.state.data.description.length > 20)
      return `${this.state.data.description.slice(0, 17)}...`;
    return this.state.data.description;
  };
  render() {
    return (
      <div className="App" id="app">
        <span className="Line1" />
        <span className="Line3" />
        <div className="NavBar">
          <span className="Description">
            <b>{this.state.data.name} &nbsp;</b> / {this.cutoff()}
          </span>
          <img
            src={require("./Components/images/logo.png")}
            alt="logo"
            className="Logo"
          />
        </div>
        <div
          className="Botly"
          id="Botly"
          style={{
            zIndex: "0"
          }}
        >
          <BlocklyDiv
            data={this.state.data}
            fetchData={this.getDataFromAllChildren}
            key={this.state.key}
            remount={this.remount}
          />
        </div>
        <div
          id="Code"
          style={{
            fontSize: this.state.data.fontSize
          }}
        >
          <MonacoEditor
            className="CodeTxt"
            language="javascript"
            theme="vs-light"
            value={this.state.data.code}
            ref={this.editor}
            options={{
              readOnly: true,
              automaticLayout: true
            }}
            style={{
              left: 0,
              width: "100%"
            }}
          />
          <span className="Line2" />
        </div>
        <Sidebar
          fetchData={this.getDataFromAllChildren}
          data={this.state.data}
          small={this.state.small}
        />
      </div>
    );
  }
}
