import { useContext } from "react";
import { useTheme } from "./DayNightTheme";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <button onClick={toggleTheme}>Переключить тему</button>
      {/* <p className="themeName">Ваша тема: {theme}</p> */}
    </div>
  );
};
export default ThemeSwitcher;
