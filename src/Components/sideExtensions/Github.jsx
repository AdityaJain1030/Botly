import React from "react";
import "./Github.css";
import Textbox from "../helpers/Textbox";
import githubContent from "github-content";

export default class Git extends React.Component {
  constructor(props) {
    super(props);
    this.gc = new githubContent();
    this.state = {
      showErr: false
    };
    this.gitLink = { gitLink: "https://github.com" };
  }
  getDataFromChild = json => {
    let previous = this.data;
    let data = { ...previous, ...json };
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
    if (json.scroll) {
      if ((json.scroll.toLowerCase() === "true") instanceof Boolean)
        returne = true;
    }
    if (returne) {
      this.setState({ showErr: true });
      return true;
    }
  };
  cloneGit = () => {
    if (!this.gitLink.gitLink.includes("https://github.com")) {
      console.log("invalid git repo");
      this.setState({ showErr: true });
      return;
    }
    let split = this.gitLink.gitLink.replace("https://github.com/", "");
    if (split !== "") {
      split = split.split("/");
      try {
        let gc = new githubContent({ owner: split[0], repo: split[1] });
        const thisLocal = this;
        gc.file("botly.json", (err, file) => {
          if (err) {
            this.setState({ showErr: true });
            return;
          }
          if (
            !thisLocal.checkShape({
              ...JSON.parse(new TextDecoder("utf-8").decode(file.contents))
            })
          ) {
            thisLocal.props.fetchData({
              ...JSON.parse(new TextDecoder("utf-8").decode(file.contents))
            });
          }
          this.setState({ showErr: false });
        });
      } catch {
        this.setState({ showErr: true });
      }
    } else {
      this.setState({ showErr: true });
    }
  };
  render() {
    return (
      <div>
        <span className="githead">Github</span>
        <Textbox
          text="Github Link"
          id="gitboi"
          left={15}
          top={70}
          minLength={18}
          singleLine={true}
          default={this.props.data.gitLink}
          defaultValue="gitLink"
          fetchData={json => {
            this.gitLink = json;
            this.getDataFromChild(json);
          }}
        />
        <span className="Fork" onClick={() => this.cloneGit()}>
          Fork
        </span>
        {this.state.showErr ? (
          <span className="errorHandle2">Invalid Github Repo</span>
        ) : null}
      </div>
    );
  }
}
