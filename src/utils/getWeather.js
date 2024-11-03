const api = {
  key: "b4b36cff5b22e8f19568c41f46dbff9f",
  weather: "https://api.openweathermap.org/data/2.5/weather",
  geocoding: "https://api.openweathermap.org/geo/1.0/direct",
};

export const getWeather = async (cityName) => {
  const [cityInfo] = await fetch(
    `${api.geocoding}?q=${cityName}&appid=${api.key}`
  ).then((res) => res.json());

  const { lat, lon } = cityInfo || {};

  return await fetch(
    `${api.weather}?lat=${lat}&lon=${lon}&appid=${api.key}&units=metric`
  ).then((res) => res.json());
};
