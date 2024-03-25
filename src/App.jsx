import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import "./App.css";
import { FaTemperatureEmpty, FaArrowUpLong } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { IoWater } from "react-icons/io5";

export const baseURL = "29226d1647109c22eee56c6a64322f6a";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [data, setData] = useState();
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input.trim()}&units=metric&appid=${baseURL}`
      )
      .then((res) => localStorage.setItem("query", JSON.stringify(res?.data)))
      .catch((e) => localStorage.setItem("query", null));
    setInput("");
    localStorage.getItem("query") !== null && setData(JSON.parse(localStorage.getItem('query')))
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  return (
    <div className="search">
      <div className="search-form">
        <form>
          <input
            type="text"
            placeholder="Enter your location"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
          />
          <button onClick={handleClick}>
            <CiSearch />
          </button>
        </form>
      </div>
      {loading ? (
        <div
          style={{ background: "white", width: "300px", textAlign: "center" }}
        >
          <PuffLoader color="pink" />
        </div>
      ) : !loading && localStorage.getItem('query') === "null" ? (
        <>
          <img src="../../assets/404.png" className="failed" />
        </>
      ) : localStorage.getItem("query") !== null ? (
        <div className="searched-info">
          <div className="searched-location">
            <h2>{JSON.parse(localStorage.getItem("query")).name}</h2>
          </div>
          <div className="searched-weather">
            <img
              src={`../../assets/${
                JSON.parse(localStorage.getItem("query")).weather[0].main ===
                "Clear"
                  ? "6974833"
                  : JSON.parse(localStorage.getItem("query")).weather[0]
                      .main === "Rain"
                  ? "3351979"
                  : JSON.parse(localStorage.getItem("query")).weather[0]
                      .main === "Snow"
                  ? "642102"
                  : JSON.parse(localStorage.getItem("query")).weather[0]
                      .main === "Cloud"
                  ? "414825"
                  : JSON.parse(localStorage.getItem("query")).weather[0]
                      .main === "Haze"
                  ? "1197102"
                  : JSON.parse(localStorage.getItem("query")).weather[0]
                      .main === "Smoke"
                  ? "4380458"
                  : JSON.parse(localStorage.getItem("query")).weather[0]
                      .main === "Mist"
                  ? "4005901"
                  : "3076129"
              }.png`}
            />
            <h2>{JSON.parse(localStorage.getItem("query")).weather[0].main}</h2>
          </div>
          <div className="searched-temp">
            <div className="temp-icon">
              <FaTemperatureEmpty />
            </div>
            <div className="temp-text">
              <p>
                {JSON.parse(localStorage.getItem("query")).main.temp}&#8451;
              </p>
            </div>
          </div>
          <div className="search-wind">
            <p>Wind:</p>
            <div className="wind-direction">
              <div className="wind-direction-icon">
                <FaArrowUpLong
                  style={{
                    transform: `rotate(${
                      JSON.parse(localStorage.getItem("query")).wind.deg
                    }deg)`,
                  }}
                />
              </div>
              <p>{JSON.parse(localStorage.getItem("query")).wind.deg}&#8728;</p>
            </div>
            <div className="wind-speed">
              {JSON.parse(localStorage.getItem("query")).wind.speed} m/s
            </div>
          </div>
          <div className="search-humidity">
            <div className="humidity-icon">
              <IoWater />
            </div>
            <div className="humidity-percentage">
              {JSON.parse(localStorage.getItem("query")).main.humidity}%
              humidity
            </div>
          </div>
        </div>
      ) : (
        localStorage.getItem("query") === null ? <></> : <></>
      )}
    </div>
  );
};

export default App;
