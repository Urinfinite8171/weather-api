import axios from "axios";

const REST_API_URL = "http://localhost:8082";

export const weather_api = (ip) => {
  return axios.get(REST_API_URL + "/weather/api/weather-by-ip", {
    params: { ip },
  });
};
