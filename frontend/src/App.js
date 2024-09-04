import './App.css';
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Stocks from './components/stocks';
import MutualFund from './components/mutualFund';
import Market from './components/market';
import StockInfo from './components/stockInfo';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element= {<Login />}></Route>
      <Route path='/search' element = { <Stocks />} ></Route>
      <Route path='/stocks' element = { <Stocks />} ></Route>
      <Route path='market' element = { < Market />} ></Route>
      <Route path='/mutual-fund' element = { < MutualFund /> }></Route>
      {/* <Route path='/stock/:stock-name/:stock-id' element= { < StockInfo />}></Route> */}
      <Route path='/stock/:stock_id' element= { < StockInfo />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
