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
    if (
      json.xml !== String ||
      json.discord !== Boolean ||
      json.reddit !== Boolean ||
      json.description !== String ||
      json.name !== String ||
      json.minScale !== Number ||
      json.maxScale !== Number ||
      json.version !== Number ||
      json.renderer !== String ||
      json.fontSize !== Number ||
      (json.scroll.toLowerCase() === "true") !== Boolean
    ) {
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
