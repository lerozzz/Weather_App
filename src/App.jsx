import "./App.css";
import { useEffect, useState, createRef } from "react";
import Input from "./Input";
import { useTheme } from "./Theme/DayNightTheme";
import ThemeSwitcher from "./Theme";
import getSameElement from "./utils/findSameElement";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Widgets } from "./Widgets";

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
      const [cityInfo] = await fetch(
        `${api.geocoding}?q=${input}&appid=${api.key}`
      ).then((res) => res.json());

      const { lat, lon } = cityInfo;

      const weatherResponse = await fetch(
        `${api.weather}?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`
      ).then((res) => res.json());

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
    const weather = JSON.parse(localStorage.getItem("weather"));
    if (weather) {
      setWeather(weather);
    }
  }, []);

  useEffect(() => {
    if (weather.length === 0) return;
    localStorage.setItem("weather", JSON.stringify(weather));
    console.log(weather.at(-1), 111);
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
