import { useState } from "react";

function Input(props) {
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        className="input-form"
        type="text"
        placeholder="Enter city/town..."
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        disabled={props.isResponseFly}
        className="search-button"
        onClick={() => props.seacrhPressed(input)}
      >
        Search
      </button>
    </div>
  );
}
export default Input;
