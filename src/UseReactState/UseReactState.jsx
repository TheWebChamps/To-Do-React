import { useState } from "react";
import "./UseReactState.css";

export function UseReactState() {
  const [count, setCount] = useState(0);
  return (
    <div id="hello">
      <h2>Counter</h2>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Count forward</button>
      <button onClick={() => setCount(count - 1)}>Count backward</button>
    </div>
  );
}
