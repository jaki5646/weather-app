import React, { useEffect, useState } from "react";
import Form from "../component/Form";
import axios from "axios";
import "../css/Searched.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FaTemperatureEmpty, FaArrowUpLong } from "react-icons/fa6";
import { PuffLoader } from "react-spinners";
import { IoWater } from "react-icons/io5";

const baseURL = "29226d1647109c22eee56c6a64322f6a";

const Searched = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const data = params.get("key");
  useEffect(() => {
    const instance = axios.create({
      baseURL: `https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${baseURL}`,
      headers: {
        "Content-Type": "aplication/json",
      },
    });
    instance
      .get()
      .then((res) => {
        setInfo(res.data);
      })
      .catch((e) => console.log(e));
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, [data]);
  console.log(info);

  return (
    // <div>
    //   <PuffLoader color="#fff" />
    // </div>
    <div className="searched">
      {loading ? (
        <>
          <div className="searched-form">
            <Form></Form>
          </div>
          <div style={{ padding: "0 120px" }}>
            <PuffLoader color="pink" />
          </div>
        </>
      ) : !loading && info.name ? (
        <>
          <div className="searched-form">
            <Form></Form>
          </div>
          <div className="searched-info">
            <div className="searched-location">
              <h2>{info.name}</h2>
            </div>
            <div className="searched-weather">
              <img
                src={`../../assets/${
                  info.weather[0].main === "Clear"
                    ? "6974833"
                    : info.weather[0].main === "Rain"
                    ? "3351979"
                    : info.weather[0].main === "Snow"
                    ? "642102"
                    : info.weather[0].main === "Cloud"
                    ? "414825"
                    : info.weather[0].main === "Haze"
                    ? "1197102"
                    : info.weather[0].main === "Smoke"
                    ? "4380458"
                    : info.weather[0].main === "Mist"
                    ? "4005901"
                    : "3076129"
                }.png`}
              />
              <h2>{info.weather[0].main}</h2>
            </div>
            <div className="searched-temp">
              <div className="temp-icon">
                <FaTemperatureEmpty />
              </div>
              <div className="temp-text">
                <p>{info.main.temp}&#8451;</p>
              </div>
            </div>
            <div className="search-wind">
              <p>Wind:</p>
              <div className="wind-direction">
                <div className="wind-direction-icon">
                  <FaArrowUpLong style={{transform: `rotate(${info.wind.deg}deg)`}}/>
                </div>
                <p>{info.wind.deg}&#8728;</p>
              </div>
              <div className="wind-speed">{info.wind.speed} m/s</div>
            </div>
            <div className="search-humidity">
              <div className="humidity-icon">
              <IoWater />
              </div>
              <div className="humidity-percentage">{info.main.humidity}% humidity</div>
            </div>
          </div>
        </>
      ) : (
        <div className="searched">
          <div className="searched-form">
            <Form></Form>
          </div>
          <div className="searched-fail">
            <img src="../../assets/404.png" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Searched;
