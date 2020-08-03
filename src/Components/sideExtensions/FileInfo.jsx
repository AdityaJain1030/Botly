import React from "react";
import "./FileInfo.css";
import Textbox from "../helpers/Textbox";
import JSZip from "jszip";
import saveAs from "file-saver";
// import FIleReader from "filereader";

export default class FileInfo extends React.Component {
  constructor(props) {
    super(props);
    this.language = "JS";
    this.editor = "v1.7";
    this.state = {
      showErr: false
    };
    this.name = { name: "My Bot" };
    this.description = { description: "Does Cool Stuff" };
    this.version = { version: 0.1 };
    this.zip = new JSZip();
    this.reader = new FileReader();
  }
  downloadCode(data) {
    this.zip.file("index.js", data.code);
    //     console.log(`{
    //       "name": "${this.name.name.replace(" ", "_")}",
    //       "version": "${this.version.version}",
    //       "description": "${this.description.description}",
    //       "main": "index.js",
    //       "scripts": {
    //         "test": "echo 'Error: no test specified' && exit 1",
    //         "start": "node index"
    //       },
    //       "keywords": [],
    //       "author": "",
    //       "license": "ISC",
    //       "dependencies": {
    //         ${data.discord ? `"discord.js": "^12.2.0"` : ""}
    //         ${data.reddit ? `"snoowrap": "1.21.0"` : ""}
    //       }
    // }`);
    this.zip.file(
      "package.json",
      `{
      "name": "${this.name.name.toLowerCase().replace(" ", "_")}",
      "version": "${this.version.version}.0",
      "description": "${this.description.description}",
      "main": "index.js",
      "scripts": {
        "test": "echo 'Error: no test specified' && exit 1",
        "start": "node index"
      },
      "keywords": [],
      "author": "",
      "license": "ISC",
      "dependencies": {
        ${data.discord ? `"discord.js": "^12.2.0"` : ""}
        ${data.reddit ? `"snoowrap": "1.21.0"` : ""}
      }
}`
    );
    this.zip.file(
      "botly.json",
      `{
        "xml": "${data.xml.replace(/"/gi, "'")}",
        "discord": ${data.discord},
        "reddit": ${data.reddit},
        "description": "${this.description.description}",
        "fontSize": ${data.fontSize},
        "maxScale": ${data.maxScale},
        "minScale": ${data.minScale},
        "name": "${this.name.name}",
        "renderer": "${data.renderer}",
        "scroll": "${data.scroll}",
        "version": ${this.version.version}
}`
    );
    this.zip.generateAsync({ type: "blob" }).then(content => {
      saveAs(content, "bot.zip");
    });
  }

  getDataFromChild = json => {
    let previous = this.data;
    let data = {
      ...previous,
      ...json
    };
    this.data = data;
    this.props.fetchData({ ...data });
  };
  checkShape = json => {
    let returne = false;
    if (json.xml) {
      if (!json.xml instanceof String) returne = true;
    }
    if (json.discord) {
      if (!json.discord instanceof Boolean) returne = true;
    }
    if (json.reddit) {
      if (!json.reddit instanceof Boolean) returne = true;
    }
    if (json.description) {
      if (!json.description instanceof String) returne = true;
    }
    if (json.name) {
      if (!json.name instanceof String) returne = true;
    }
    if (json.minScale) {
      if (!json.minScale instanceof Number) returne = true;
    }
    if (json.maxScale) {
      if (!json.maxScale instanceof Number) returne = true;
    }
    if (json.version) {
      if (!json.version instanceof Number) returne = true;
    }
    if (json.renderer) {
      if (!json.renderer instanceof String) returne = true;
    }
    if (json.fontSize) {
      if (!json.fontSize instanceof Number) returne = true;
    }
    if (json.scroll.toLowerCase()) {
      if ((json.scroll.toLowerCase() === "true") instanceof Boolean)
        returne = true;
    }
    if (returne) {
      this.setState({ showErr: true });
      return true;
    }
  };
  fileListener(e) {
    let file = e.target.files[0];
    if (file) {
      if (file.name !== "botly.json") {
        console.log("Invalid File");
        this.setState({ showErr: true });
      } else {
        this.reader.onload = ef => {
          //console.log(ef.target.result);
          try {
            const json = JSON.parse(ef.target.result);
            if (!this.checkShape(json)) {
              json.name = json.name.replace("_", " ");
              this.props.fetchData({ ...json });
              this.setState({ showErr: false });
            }
          } catch {
            console.log("Invalid fil");
            this.setState({ showErr: true });
          }
        };
        try {
          this.reader.readAsText(file);
        } catch {
          console.log("Invalid file");
          this.setState({ showErr: true });
        }
      }
    }
  }
  render() {
    return (
      <div>
        <span className="uCHeader">File Info</span>
        <Textbox
          text="Bot Name"
          left={15}
          top={70}
          maxCharacters={15}
          singleLine={true}
          default={this.props.data.name}
          defaultValue="name"
          fetchData={object => {
            this.name = object;
            this.getDataFromChild(object);
          }}
        />
        <Textbox
          text="Bot Description"
          left={15}
          maxCharacters={54}
          height={135}
          top={170}
          defaultValue="description"
          default={this.props.data.description}
          fetchData={object => {
            this.description = object;
            this.getDataFromChild(object);
          }}
        />
        <Textbox
          text="Bot Version"
          left={15}
          top={355}
          singleLine={true}
          type="number"
          maxCharacters={8}
          defaultValue="version"
          default={this.props.data.version}
          fetchData={object => {
            this.version = object;
            this.getDataFromChild(object);
          }}
        />
        <span className="language">
          Language: {"\u00A0"}
          <b>{this.language}</b>
        </span>
        <span className="eVersion">
          Editor Version: {"\u00A0"}
          <b>{this.editor}</b>
        </span>
        <label for="file-upload" className="Upload">
          Upload
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".json"
          onChange={e => this.fileListener(e)}
        />
        <span className="Or">Or</span>
        <span
          className="Download"
          onClick={() => this.downloadCode({ ...this.props.data })}
        >
          Download
        </span>
        {this.state.showErr ? (
          <span className="errorHandle">Invalid File</span>
        ) : null}
      </div>
    );
  }
}
