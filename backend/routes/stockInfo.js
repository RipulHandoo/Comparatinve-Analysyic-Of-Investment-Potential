const express = require('express');
const GetFundamentals = require('../services/fundamentals');
const UpperLowerLimit = require('../services/upperLowerLimit');

const infoRouter = express.Router()

infoRouter.get("/api/v1/stock/info/fundamentals", GetFundamentals)
infoRouter.get("/api/v1/stock/info/upperLowerLimit", UpperLowerLimit)

module.exports = infoRouter;