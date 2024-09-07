const express = require('express');
const GetFundamentals = require('../services/fundamentals');
const UpperLowerLimit = require('../services/upperLowerLimit');
const CurrRate = require('../services/currRate');
const StockData = require('../services/stockData');

const infoRouter = express.Router()

infoRouter.get("/api/v1/stock/info/fundamentals", GetFundamentals)
infoRouter.get("/api/v1/stock/info/upperLowerLimit", UpperLowerLimit)
infoRouter.get("/api/v1/stock/info/currRate", CurrRate)
infoRouter.get("/api/v1/stock/info/data", StockData)
module.exports = infoRouter;