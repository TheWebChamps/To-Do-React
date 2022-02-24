import { Component } from "react";
import "./index.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      val: document.getElementById("textIt").value,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({ val: document.getElementById("textIt").value });
    }, 0);
  }
  render() {
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
          <h1>
            <h2 id="print">{this.state.val}</h2>
          </h1>
          <input
            id="textIt"
            type="text"
            placeholder="Type something..."
            style={{ width: "500px", height: "40px" }}
          />
          <br />
          <br />
        </center>
      </div>
    );
  }
}
