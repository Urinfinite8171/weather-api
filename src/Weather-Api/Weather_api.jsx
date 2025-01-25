import axios from "axios";

const REST_API_URL =
  "http://ec2-65-2-153-2.ap-south-1.compute.amazonaws.com:8080";

export const weather_api = (ip) => {
  return axios.get(REST_API_URL + "/weather/api/weather-by-ip", {
    params: { ip },
  });
};
