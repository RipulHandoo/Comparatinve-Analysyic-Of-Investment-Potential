import React, { useState } from "react";
import Header from "./Header";
import "./InvestmentCalculator.css";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);

const InvestmentCalculator = () => {
  const [totalInvestment, setTotalInvestment] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [timeSpan, setTimeSpan] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("");
  const [allocation, setAllocation] = useState([33.3, 33.3, 33.3]); // Initial equal distribution
  
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleCalculate = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/mutual-fund-investment-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalInvestment,
          expectedReturn,
          timeSpan,
          riskTolerance,
        }),
      });
      const data = await response.json();
      console.log(data);
      setAllocation(data.investments); // Set the allocation from server response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   if (totalInvestment && expectedReturn && timeSpan) {
  //     handleCalculate(); // Trigger calculation once inputs are provided
  //   }
  // }, [totalInvestment, expectedReturn, timeSpan]);

  const chartData = {
    labels: ["Large Cap", "Mid Cap", "Small Cap"],
    datasets: [
      {
        data: allocation,
        backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
        hoverBackgroundColor: ["#2e59d9", "#17a673", "#2c9faf"],
      },
    ],
  };

  return (
    <>
      <Header />
      <h1 style={{ marginLeft: "30px", marginTop: "100px", fontFamily: "Italic", fontWeight: "bold", fontSize: "26px" }}>Mutual Fund Investment</h1>

      <div className="investment-container">
        <div className="investment-input-section">
          <div className="total-investment">
            <p>Total Investment</p>
            <input
              type="number"
              placeholder="Enter amount"
              value={totalInvestment}
              onChange={handleInputChange(setTotalInvestment)}
            />
          </div>

          <div className="total-investment">
            <p>Expected Return</p>
            <input
              type="number"
              placeholder="Enter expected return"
              value={expectedReturn}
              max="100"
              onChange={(e) => {
                if (e.target.value > 100) {
                  setExpectedReturn(100);
                  return;
                }
                handleInputChange(setExpectedReturn)(e);
              }}
            />
          </div>

          <div className="total-investment">
            <p>Risk Tolerance</p>
            <input
              type="text"
              placeholder="High, Medium, or Low"
              value={riskTolerance}
              onChange={handleInputChange(setRiskTolerance)}
            />
          </div>

          <div className="total-investment">
            <p>Time Span</p>
            <input
              type="number"
              placeholder="Enter years"
              value={timeSpan}
              onChange={(e) => {
                if (e.target.value > 100) {
                  setTimeSpan(100);
                  return;
                }
                handleInputChange(setTimeSpan)(e);
              }}
            />
          </div>

          <div className="total-investment">
            <button onClick={ handleCalculate }>Submit</button>
          </div>
        </div>

        <div className="investment-graph-section">
          <Doughnut data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </>
  );
};

export default InvestmentCalculator;
