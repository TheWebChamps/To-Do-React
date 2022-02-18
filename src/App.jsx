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
  setText(e, text) {
    e.preventDefault();
    text = document.getElementById("textIt").value;
    document.getElementById("print").innerHTML = text;
  }
  render() {
    const arr = [1, 2, 3, 4, 5];
    const map = arr.map((num) => num * 4);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <center>
          <ol>{map.toString()}</ol>
          <h1>
            {this.state.bin.toLocaleString()}
            <br />
            {this.state.bin2.toLocaleString()}
            <br />
            <h2 id="print"> </h2>
          </h1>
          <form onSubmit={this.setText}>
            <input
              id="textIt"
              type="text"
              placeholder="Type something..."
              style={{ width: "500px", height: "40px" }}
            />
            <br />
            <br />
            <button
              type="submit"
              style={{
                backgroundColor: "red",
                border: "none",
                height: "40px",
                width: "200px",
                textAlign: "center",
              }}
              onClick={this.setText}
            >
              Click to change
            </button>
          </form>
        </center>
      </div>
    );
  }
}
