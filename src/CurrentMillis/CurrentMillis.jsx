import { Component } from "react";

export class CurrentMillis extends Component {
  constructor() {
    super();
    this.state = {
      currentMillis: Date.now(),
    };
  }
  update() {
    this.setState({
      currentMillis: Date.now(),
    });
  }
  componentDidMount() {
    this.interval = setInterval(() => this.update(), 1000000000000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <h3>{this.state.currentMillis}</h3>;
  }
}
