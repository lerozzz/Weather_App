import "./App.css";
import { useEffect, useState, createRef } from "react";
import Input from "./Input";
import { useTheme } from "./Theme/DayNightTheme";
import ThemeSwitcher from "./Theme";
import getSameElement from "./utils/findSameElement";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Widgets } from "./Widgets";
import { getWeather } from "./utils/getWeather";

function App() {
  const [weather, setWeather] = useState([]);
  const { isLightTheme } = useTheme();
  const [isResponseFly, setIsResponseFly] = useState(false);
  const appCalc = `App-header ${isLightTheme ? "app__light" : ""}`;
  const appInputBox = `inputBox ${isLightTheme ? "inputBox__light" : ""}`;
  const appName = `app-name ${isLightTheme ? "app-name__light" : ""}`;

  const notify = () =>
    toast.error("This city already exist", {
      position: "bottom-right",
    });

  const errorCity = () =>
    toast.error("This city doesn't exist", {
      position: "bottom-right",
    });

  const seacrhPressed = async (input) => {
    setIsResponseFly(true);
    try {
      const weatherResponse = await getWeather(input);
      const haveSameElement = getSameElement(weatherResponse, weather);

      if (haveSameElement === true) {
        setIsResponseFly(false);
        return notify();
      }
      setWeather((prev) => [
        ...prev,
        { ...weatherResponse, nodeRef: createRef(null) },
      ]);

      setIsResponseFly(false);
    } catch (error) {
      setIsResponseFly(false);
      return errorCity();
    }
  };

  useEffect(() => {
    const weatherList = JSON.parse(localStorage.getItem("weather"));

    const refreshWeatherList = async () => {
      const newWeatherList = [];

      for await (const weather of weatherList) {
        const newWeatherElement = await getWeather(weather.name);
        newWeatherList.push(newWeatherElement);
      }

      setWeather(newWeatherList);
    };

    if (weatherList?.length >= 1) {
      refreshWeatherList();
    }
  }, []);

  useEffect(() => {
    if (weather.length === 0) return;
    localStorage.setItem("weather", JSON.stringify(weather));
  }, [weather]);

  const removeWidget = (index) => {
    setWeather((el) => el.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <main className={appCalc}>
        <ToastContainer />
        <ThemeSwitcher />
        {/* Header */}
        <h1 className={appName}>Weather App</h1>
        {/* Seacrh Box */}
        <Input seacrhPressed={seacrhPressed} isResponseFly={isResponseFly} />
        <Widgets weather={weather} removeWidget={removeWidget} />
      </main>
    </div>
  );
}

export default App;
