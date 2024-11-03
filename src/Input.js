import { useState } from "react";
import { useTheme } from "./Theme/DayNightTheme";

function Input(props) {
  const [input, setInput] = useState("");
  const { isLightTheme } = useTheme();
  const appSeacrhButton = `search-button ${
    isLightTheme ? "search-button__light" : ""
  }`;
  const appInputBox = `inputBox ${isLightTheme ? "inputBox__light " : ""}`;

  return (
    <div className="mainDivInput">
      <div className={appInputBox}>
        <input
          type="text"
          required="required"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <span>Enter city/town...</span>
      </div>
      <div className="inputButtonWrapper">
        <button
          disabled={props.isResponseFly}
          className={appSeacrhButton}
          onClick={() => props.seacrhPressed(input)}
        >
          Search
        </button>
      </div>
    </div>
  );
}
export default Input;
