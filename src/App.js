import React from "react";
import "./index.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
     bin: 0
    };
  }
  tickyTocky() {
    this.setState(() => ({
      bin: this.state.bin + 1
    }));
  }
  componentDidMount() {
    setInterval(() => {this.tickyTocky()}, 1000);
  }
  render() {
    return <center><h1>{this.state.bin}</h1></center>;
  }
}
