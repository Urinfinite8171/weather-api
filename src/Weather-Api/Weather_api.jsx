import axios from "axios";

const REST_API_URL = "http://3.110.167.178:8080";

export const weather_api = (ip) => {
  return axios.get(REST_API_URL + "/weather/api/weather-by-ip", {
    params: { ip },
  });
};
