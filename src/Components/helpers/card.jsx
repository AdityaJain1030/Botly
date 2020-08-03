import React from "react";
import "./card.css";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.onDefault
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      active: !this.state.active
    });
    this.props.fetchData({
      [this.props.title.toLowerCase()]: !this.state.active
    });
  }

  componentDidMount() {
    this.props.fetchData({
      [this.props.title.toLowerCase()]: this.props.onDefault
    });
  }

  render() {
    return (
      <div
        className="card"
        onClick={this.toggle}
        style={{
          top: this.props.top,
          background: "#8289CB"
        }}
      >
        <span className="title">{this.props.title}</span>
        <span className="description">{this.props.description}</span>
        {this.state.active ? (
          <div>
            <span className="endisable">Enabled</span>
            <span className="circle" style={{ background: "#60D280" }} />
          </div>
        ) : (
          <div>
            <span className="endisable">Disabled</span>
            <span className="circle" style={{ background: "#D26060" }} />
          </div>
        )}
      </div>
    );
  }
}
