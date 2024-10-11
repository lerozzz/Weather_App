import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Input from "./Input";
import { useTheme, ThemeChanger } from "./Theme/DayNightTheme";
import ThemeSwitcher from "./Theme";
import CloseIcon from "./ButtonClose/CloseIcon";
import ButtonClose from "./ButtonClose";
import getSameElement from "./utils/findSameElement";

const api = {
  key: "b4b36cff5b22e8f19568c41f46dbff9f",
  weather: "https://api.openweathermap.org/data/2.5/weather",
  geocoding: "https://api.openweathermap.org/geo/1.0/direct",
};

function App() {
  const [weather, setWeather] = useState([]);
  const { isLightTheme } = useTheme();
  const [isResponseFly, setIsResponseFly] = useState(false);
  const appCalc = `App-header ${isLightTheme ? "app__light" : ""}`;
  const appWidget = `widget ${isLightTheme ? "widget__light" : ""}`;
  const appName = `app-name ${isLightTheme ? "app-name__light" : ""}`;

  const seacrhPressed = async (input) => {
    setIsResponseFly(true);

    const [cityInfo] = await fetch(
      `${api.geocoding}?q=${input}&appid=${api.key}`
    ).then((res) => res.json());

    const { lat, lon } = cityInfo;

    const weatherResponse = await fetch(
      `${api.weather}?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`
    ).then((res) => res.json());

    const haveSameElement = getSameElement(weatherResponse, weather);
    console.log(haveSameElement);
    if (haveSameElement === true) {
      setIsResponseFly(false);
      return alert("Уже было");
    }
    setWeather((prev) => [...prev, weatherResponse]);
    setIsResponseFly(false);
  };

  const removeWidget = (index) => {
    setWeather((el) => el.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <main className={appCalc}>
        {/* Header */}
        <h1 className={appName}>Weather App</h1>
        {/* Seacrh Box */}
        <Input seacrhPressed={seacrhPressed} isResponseFly={isResponseFly} />
        <div className="widget-wrapper">
          {weather?.map((weather, index) => {
            const weatherCond = weather?.weather?.[0]?.main;
            const weatherTemp = Math.round(weather?.main?.temp); //проверка на истинность
            const icon = weather?.weather?.[0]?.icon;

            return (
              <div key={index} className={appWidget}>
                <ButtonClose removeWidget={() => removeWidget(index)} />
                {/* Location */}
                <p className="city-name">{weather?.name || "City"}</p>
                <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
                {/* Temperature */}
                <p>
                  {" "}
                  {weatherTemp.toString() ? `${weatherTemp} °C` : "Temperature"}
                </p>
                {/* Condition */}
                <p>{weatherCond ? `${weatherCond}` : "Condition"}</p>
              </div>
            );
          })}
        </div>
        <ThemeSwitcher />
      </main>
    </div>
  );
}

export default App;
