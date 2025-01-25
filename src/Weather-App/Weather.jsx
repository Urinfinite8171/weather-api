import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { weather_api } from "../Weather-Api/Weather_api";

function Weather() {
  const [input, setInput] = useState("New Delhi"); // Unified input for IP/City
  const [weather, setWeather] = useState(null); // Weather data
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(""); // Error state

  const fetchWeather = async () => {
    // Regular expression for IPv4 validation
    const ipv4Regex =
      /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;

    if (!input) {
      setError("Please enter a valid city name or IP address.");
      return;
    }

    // Validate if the input is a valid IPv4 address or not
    if (input.includes(".") && !ipv4Regex.test(input)) {
      setError("Invalid IP address format. Please enter a valid IPv4 address.");
      return;
    }

    try {
      const response = await weather_api(input); // Send input as the query
      setWeather(response.data.weather);
      setLocation(response.data.location);
      setError(""); // Clear previous errors
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      setWeather(null);
      setLocation(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-500 via-indigo-700 to-gray-900 text-white p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full max-w-xl bg-opacity-40 bg-gray-800 backdrop-blur-xl rounded-3xl shadow-2xl p-8 transition-all transform hover:shadow-3xl"
      >
        <h1 className="text-4xl font-bold mb-6 text-center drop-shadow-lg">
          Weather Checker{" "}
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 5 }}
            role="img"
            aria-label="cloud and sun"
          >
            🌤️
          </motion.span>
        </h1>
        <p className="text-center mb-8 text-lg font-medium text-gray-300 leading-6">
          Enter your city name or IP address below to get the latest weather
          updates in real-time!
        </p>

        {/* Input Field */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8"
        >
          <label className="absolute left-4 -top-3 text-sm font-semibold text-gray-400 bg-gray-800 px-2 rounded">
            City or IP Address
          </label>
          <input
            type="text"
            placeholder="e.g., New York or 192.168.0.1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-6 py-3 rounded-full text-gray-800 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md placeholder-gray-500"
          />
        </motion.div>

        {/* Fetch Weather Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchWeather}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white font-bold text-lg rounded-full shadow-lg transition-transform"
        >
          Get Weather
        </motion.button>

        {/* Error Display */}
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-red-500 font-medium text-center bg-red-100 py-2 px-4 rounded-lg shadow-sm"
          >
            {error}
          </motion.p>
        )}

        {/* Weather Display */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10 p-6 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-700 text-gray-300 rounded-2xl shadow-lg"
          >
            <h2 className="text-3xl font-semibold mb-4 text-center text-indigo-300">
              Weather Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* City and Country */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-300">
                  <span className="text-indigo-400">📍 Location:</span>
                </h3>
                <p className="text-2xl font-bold">{location.city}</p>
                <p className="text-lg text-gray-400 italic">
                  {location.country}
                </p>
              </div>

              {/* Temperature */}
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-300">
                  <span className="text-yellow-400">🌡️ Temperature:</span>
                </h3>
                <p className="text-4xl font-extrabold">{weather.temperature}</p>
              </div>

              {/* Weather Humidity */}
              <div className="col-span-2 text-center">
                <h3 className="text-lg font-medium text-gray-300">
                  <span className="text-blue-400">💧 Humidity:</span>
                </h3>
                <p className="text-2xl font-bold italic text-gray-100">
                  {weather.humidity}
                </p>
              </div>

              {/* Weather Description */}
              <div className="col-span-2 text-center">
                <h3 className="text-lg font-medium text-gray-300">
                  <span className="text-blue-400">☁️ Condition:</span>
                </h3>
                <p className="text-2xl font-bold italic text-gray-100">
                  {weather.description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Weather;
