import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Input from "./Input";
import { useTheme, ThemeChanger } from "./Theme/DayNightTheme";
import ThemeSwitcher from "./Theme";

const api = {
  key: "b4b36cff5b22e8f19568c41f46dbff9f",
  weather: "https://api.openweathermap.org/data/2.5/weather",
  geocoding: "https://api.openweathermap.org/geo/1.0/direct",
};

function App() {
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});
  const { theme, setTheme } = useTheme();
  const appCalc = `App-header ${theme === "light" ? "app__light" : ""}`;
  const appWidget = `widget ${theme === "light" ? "widget__light" : ""}`;
  const appName = `app-name ${theme === "light" ? "app-name__light" : ""}`;
  console.log(appCalc);

  // console.log(theme, 111);
  // console.log(toggleTheme, 33333);

  const weatherTemp = Math.round(weather?.main?.temp); //проверка на истинность
  const weatherCond = weather?.weather?.[0]?.main;
  const icon = weather?.weather?.[0]?.icon;

  const seacrhPressed = async (input) => {
    setCityName(input);
    const [cityInfo] = await fetch(
      `${api.geocoding}?q=${input}&appid=${api.key}`
    ).then((res) => res.json());

    const { lat, lon } = cityInfo;

    const weatherResponse = await fetch(
      `${api.weather}?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`
    ).then((res) => res.json());
    console.log(weatherResponse, '2222');
    setWeather(weatherResponse);


  };

  return (
    <div className="App">
      <header className={appCalc}>
        {/* Header */}
        <h1 className={appName}>Weather App</h1>
        {/* Seacrh Box */}
        <Input seacrhPressed={seacrhPressed} />
        <main>
          <div className={appWidget}>
            {/* Location */}
            <p>{cityName ? cityName : "City"}</p>
            <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
            {/* Temperature */}
            {/* {weather && weather.main && weather.main.temp} */}
            <p>
              {" "}
              {weatherTemp.toString() ? `${weatherTemp} °C` : "Temperature"}
            </p>
            {/* Condition(Sunny) */}
            <p>{weatherCond ? `${weatherCond}` : "Condition"}</p>
          </div>
        </main>
        <ThemeSwitcher />
      </header>
    </div>
  );
}

export default App;
