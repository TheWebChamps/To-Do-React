import { useState } from "react";
import "./UseReactState.css";

export function UseReactState() {
  const [count, setCount] = useState(0);
  return (
    <div id="hello">
      <h2>Play a game</h2>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Click!</button>
      <button onClick={() => setCount(count - 1)}>Click?</button>
    </div>
  );
}
