import React from "react";
import "./index.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      bin: new Date(),
    };
  }
  tickyTocky() {
    this.setState(() => ({
      bin: new Date(),
    }));
  }
  componentDidMount() {
    setInterval(() => {
      this.tickyTocky();
    }, 1000);
  }
  render() {
    return (
      <center>
        <h1>
          {this.state.bin.toLocaleString()}
        </h1>
      </center>
    );
  }
}
