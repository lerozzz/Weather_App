import { useContext } from "react";
import { useTheme } from "./DayNightTheme";
import "./index.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div className="container">
        <input className="input-check" type="checkbox" id="darkmode-toggle" />
        <label
          onClick={toggleTheme}
          for="darkmode-toggle"
          className="button-check"
        ></label>
      </div>
      {/* <p className="themeName">Ваша тема: {theme}</p> */}
    </div>
  );
};
export default ThemeSwitcher;
