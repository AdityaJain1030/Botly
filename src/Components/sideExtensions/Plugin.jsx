import React from "react";
import "./Plugin.css";
import Card from "../helpers/card";

export default class Plug extends React.Component {
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
    const differentDiscord = this.props.data.discord !== nextProps.data.discord;
    const differentReddit = this.props.data.reddit !== nextProps.data.reddit;
    return differentDiscord || differentReddit;
  }
  render() {
    return (
      <div>
        <span className="PluginHead">Plugins</span>
        <Card
          title="Discord"
          description="Add discord functionality to your bots"
          onDefault={this.props.data.discord}
          fetchData={data => this.getDataFromChild(data)}
          top={75}
        />
        {/* <Card
          title="Reddit"
          description="Add reddit capabilities to your bots"
          onDefault={this.props.data.reddit}
          fetchData={data => this.getDataFromChild(data)}
          top={205}
        /> */}
      </div>
    );
  }
}
