import ButtonClose from "../ButtonClose";
import { useTheme } from "../Theme/DayNightTheme";

export const Widget = (props) => {
  const { temp, condition, removeWidget, icon, name } = props;
  const weatherTemp = Math.round(temp); //проверка на истинность

  const { isLightTheme } = useTheme();
  const appWidget = `widget ${isLightTheme ? "widget__light" : ""}`;

  return (
    <div className={appWidget}>
      <ButtonClose removeWidget={removeWidget}>&times;</ButtonClose>
      {/* Location */}
      <p className="city-name">{name}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
      {/* Temperature */}
      <p> {weatherTemp.toString() ? `${weatherTemp} °C` : "Temperature"}</p>
      {/* Condition */}
      <p>{condition || "Condition"}</p>
    </div>
  );
};
