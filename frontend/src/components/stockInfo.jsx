import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useLocation, useParams } from "react-router-dom";
import "./stockInfo.css";

const StockInfo = () => {
  const [currVal, setCurrVal] = useState("");
  const [currProfit, setCurrProfit] = useState("");
  const [currProfitPercentage, setCurrProfitPercentage] = useState("");
  const [high, setHigh] = useState("");
  const [low, setLow] = useState("");
  const [prevClose, setPrevClose] = useState("");
  const [open, setOpen] = useState("");
  const [stockName, setStockName] = useState("");
  const [stockID, setStockID] = useState("");
  const [PE, setPE] = useState("");
  const [PB, setPB] = useState("");
  const [ROE, setROE] = useState("");
  const [CEPS, setCEPS] = useState("");
  const [EPS, setEPS] = useState("");
  const [Group, setGroup] = useState("");
  const [Index, setIndex] = useState("");
  const [Industry, setIndustry] = useState("");
  const [FaceShow, setFaceShow] = useState("");
  const [MarketCap, setMarketCap] = useState("");
  const [upperLimit, setUpperLimit] = useState("");
  const [lowerLimit, setLowerLimit] = useState("");
  const [time, setTime] = useState("5d");
  const [stockData, setStockData] = useState([]);
  const [Sector, setSector] = useState("");
  const location = useLocation();
  const { stock_id } = useParams();

  const handleTimeClick = (event) => {
    setTime(event);
    // setStockData([])
    // console.log(time)
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log("Payload: ", payload);
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${payload[0].payload.dttm}`}</p>
          <p className="intro">{`Value: ${payload[0].payload.vale1}`}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    console.log(stock_id);
    // What if the user directly seacrh the url, so we have to get the Stock_id from the url
    // URL -> http://localhost:3001/stock/{stock_id}
    // console.log("Location State:", location.state); // Debugging
    if (location.state) {
      setStockName(location.state.long_name || "");
      setStockID(location.state.stockID || "");
    } else {
      setStockID(stock_id);
    }
  }, [location, stock_id]);

  // Get the data for the fundamental section from the backend service
  // This useEffect hook will be used to get the data, it will run once when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/stock/info/fundamentals",
          {
            params: {
              scripcode: stockID, // Make sure this matches the backend expected key
            },
          }
        );
        console.log(result.data);
        // Here when we get the data we will update the values
        if (result.data !== null) {
          setEPS(result.data.EPS);
          setCEPS(result.data.CEPS);
          setIndex(result.data.Index);
          setROE(result.data.ROE);
          setIndustry(result.data.Industry);
          setGroup(result.data.Group);
          setFaceShow(result.data.IShow);
          setSector(result.data.Sector);
          setPB(result.data.PB);
          setPE(result.data.PE);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (stockID) {
      // Ensure stockID is defined
      fetchData();
    }
  }, [stockID]);

  // This effect will execute ince the component is mounted. It is used to fetch the upper and lower limit of the stock.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/stock/info/upperLowerLimit",
          {
            params: {
              scripcode: stockID,
            },
          }
        );

        console.log(result.data);
        setUpperLimit(result.data.UpperT);
        setLowerLimit(result.data.LowerT);
      } catch (error) {
        console.log(
          "Error while fetching the data from the http://localhost:3000/api/v1/upperLowerLimit. In stockInfo.jsx. Error Message: ",
          error
        );
      }
    };

    if (stockID) {
      fetchData();
    }
  }, [stockID]);

  // This effect will be called perdicilly to keep the values of the stock up to the market. This is used to get data like curr value, percentage change and total change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/stock/info/currRate",
          {
            params: {
              scripcode: stockID,
            },
          }
        );
        console.log(result.data);
        setCurrProfitPercentage(result.data.CurrRate.PcChg);
        setStockName(result.data.Cmpname.FullN);
        setCurrVal(result.data.CurrRate.LTP);
        setCurrProfit(result.data.CurrRate.Chg);
        setPrevClose(result.data.Header.PrevClose);
        setOpen(result.data.Header.Open);
        setLow(result.data.Header.Low);
        setHigh(result.data.Header.High);
      } catch (error) {
        console.log(
          "Error while fetching the data from the http://localhost:3000/api/v1/upperLowerLimit. In stockInfo.jsx. Error Message: ",
          error
        );
      }
    };
    if (stockID) {
      fetchData();
    }

    // TODO: Update this so we can get the current value frequently
    // Fetch data every 10 seconds
    // const intervalId = setInterval(fetchData, 10000);

    // Clean up the interval on component unmount
    // return () => clearInterval(intervalId);
  }, [stockID]);

  // This effect will be used to get the data of the stock.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/api/v1/stock/info/data",
          {
            params: {
              time: time,
              scripcode: stockID,
            },
          }
        );
        setStockData(result.data);
        console.log(result.data);
      } catch (error) {
        console.log(
          "Error while fetching the data from the http://localhost:3000/api/v1/upperLowerLimit. In stockInfo.jsx. Error Message: ",
          error
        );
      }
    };

    if (stockID) {
      fetchData();
    }
  }, [stockID, time]);
  return (
    <>
      <Header />
      <div className="stock-info-container">
        <div className="stock-info-graph-details">
          <div className="stock-info-details">
            <div className="stock-name">
              <h1>{stockName}</h1>
            </div>
            <div className="stock-id">
              <h1>₹{currVal}</h1>
              <h2>
                {currProfit} ({currProfitPercentage}%)
              </h2>
            </div>
          </div>

          <div className="stock-info-graph-details">
            <ResponsiveContainer height={400}>
              <LineChart data={stockData}>
                <XAxis
                  dataKey="ddtm"
                  stroke="none" // Hide the X axis line
                  tick={false} // Optionally hide the X axis ticks
                  axisLine={false} // Hide the X axis line
                  tickLine={false} // Hide the X axis ticks
                />
                <YAxis
                  dataKey="vale1"
                  stroke="none"
                  tick={false}
                  domain={[
                    Math.min(...stockData.map((data) => data.vale1)),
                    "auto",
                  ]}
                />

                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="vale1"
                  stroke="#00C49F"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Additional buttons or elements */}

            <div className="timeline-button">
              <span
                className={time === "0" ? "active" : ""}
                onClick={() => handleTimeClick("0")}
              >
                1D
              </span>
              <span 
              className={time === "5d" ? "active" : ""}
              onClick={() => handleTimeClick('5d')}
              >1W</span>
              <span 
              className={time === "6M" ? "active" : ""}
              onClick={() => handleTimeClick('6M')}
              >6M</span>
              <span 
              className={time === "1Y" ? "active" : ""}
              onClick={() => handleTimeClick('12M')}>1Y</span>
            </div>
          </div>
          <div className="stock-info-button-for-graph"></div>

          <div className="stock-info-other-info">
            <div className="fundamentals-section">
              <h2>Performace</h2>
              <div className="fundamentals-details">
                <div className="fundamentals-left">
                  {/* <p>Market Cap</p> */}
                  <p>Upper Limit</p>
                  <p>Lower Limit</p>
                  {/* <p>Sector</p>
                  <p>Group</p> */}
                </div>
                <div className="fundamentals-center">
                  {/* <p>{MarketCap}</p> */}
                  <p>{upperLimit}</p>
                  <p>{lowerLimit}</p>
                </div>
                <div className="fundamentals-right">
                  <p>Open</p>
                  <p>Prev. Close</p>
                  <p>High</p>
                  <p>Low</p>
                </div>
                <div className="fundamentals-right-values">
                  <p>{open}</p>
                  <p>{prevClose}</p>
                  <p>{high}</p>
                  <p>{low}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="stock-info-other-info">
            <div className="fundamentals-section">
              <h2>Fundamentals</h2>
              <div className="fundamentals-details">
                <div className="fundamentals-left">
                  {/* <p>Market Cap</p> */}
                  <p>P/E Ratio(TTM)</p>
                  <p>P/B Ratio</p>
                  <p>Sector</p>
                  <p>Group</p>
                </div>
                <div className="fundamentals-center">
                  {/* <p>{MarketCap}</p> */}
                  <p>{PE}</p>
                  <p>{PB}</p>
                  <p>{Sector}</p>
                  <p>{Group}</p>
                </div>
                <div className="fundamentals-right">
                  <p>ROE</p>
                  <p>EPS(TTM)</p>
                  <p>CEPS</p>
                  <p>Face Value</p>
                  <p>Industry</p>
                </div>
                <div className="fundamentals-right-values">
                  <p>{ROE}</p>
                  <p>{EPS}</p>
                  <p>{CEPS}</p>
                  <p>{FaceShow}</p>
                  <p>{Industry}</p>
                </div>
              </div>
              <p className="fundamentals-note">
                <i className="fas fa-info-circle"></i> Understand Fundamentals
              </p>
            </div>
          </div>
        </div>

        <div className="stock-info-by-script">
          <div className="stock-by-script">Script data</div>
        </div>
      </div>
    </>
  );
};

export default StockInfo;
