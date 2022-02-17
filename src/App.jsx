import { Component } from "react";
import "./index.css";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bin: Date.now(),
      bin2: new Date()
    };
  }
  tickyTocky() {
    this.setState(() => ({
      bin: Date.now(),
      bin2: new Date()
    }));
  }
  componentDidMount() {
    setInterval(() => {
      this.tickyTocky();
    }, 1000000000000);
  }
  componentWillUnmount() {
    clearInterval(this.tickyTocky());
  }
  render() {
    return (
      <center>
        <h1>
          {this.state.bin.toLocaleString()}<br />
          {this.state.bin2.toLocaleString()}
        </h1>
      </center>
    );
  }
}
