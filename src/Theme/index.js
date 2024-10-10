import { useContext } from "react";
import { useTheme } from "./DayNightTheme";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>Switch Theme</button>
      {/* <p className="themeName">Ваша тема: {theme}</p> */}
    </div>
  );
};
export default ThemeSwitcher;
