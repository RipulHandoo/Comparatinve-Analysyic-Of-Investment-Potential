import React from 'react'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

import { useNavigate } from 'react-router-dom';

import './Stocks.css'
// const element = <FontAwesomeIcon icon="fa-solid fa-wand-magic-sparkles" />
const Stocks = () => {
  const naviagte = useNavigate();
  const handleClick = () => {
    naviagte('/market');
  }
  return (
   <>
      <Header />
      <div className='stock-page'>
        <div className='stock-page-banner'>
          <h1>EffortLess Investing</h1>
          <h2>Invest In Stocks</h2>
          <img src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/stocksHeader.96834ea8.webp" alt=  "stock_image" />
        </div>

        <div className='stock-expression-area'>
          {/* here add the icon & description*/}

          <FontAwesomeIcon icon={faWandMagicSparkles} />

          <span>
            Power-packed with
            <br />
            everything you need.
          </span>

        </div>

        {/* Here cerate 1 box that will be having the information to the other asset classes with the link to there respective pages */}
        <div className='asset-class-area-blocks'>
          {/* here we cerate 1 div that will be having some height and width and that div will be having a speacial flex direction despite of their parent div */}

          <div className='market-at-foot-step'>
            <h1>Market is a snapshot.</h1>
            <h3>Simplified enough for Begineers</h3>

            <button 
              onClick={handleClick}
            >Try it out</button>
          </div>
            <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRXuE_LR04cUOoXMbYoRMtRzTi8C-IIyzrIwalsOE-DVvrEF4vv" alt="site logo" />
        </div>
      </div>
   </>
  )
}

export default Stocks
