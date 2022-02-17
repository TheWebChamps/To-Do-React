import { Component } from "react";
import "./index.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      bin: Date.now(),
      bin2: new Date(),
    };
  }
  tickyTocky() {
    this.setState(() => ({
      bin: Date.now(),
      bin2: new Date(),
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
    const arr = [1, 2, 3, 4, 5];
    const map = arr.map((num) => num * 4);
    return (
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
        <center>
          <ol>{map.toString()}</ol>
          <h1>
            {this.state.bin.toLocaleString()}
            <br />
            {this.state.bin2.toLocaleString()}
          </h1>
        </center>
      </div>
    );
  }
}
