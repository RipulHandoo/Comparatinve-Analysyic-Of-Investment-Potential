const express = require('express');
const GetFundamentals = require('../services/fundamentals');

const infoRouter = express.Router()

infoRouter.get("/api/v1/stock/info/fundamentals", GetFundamentals)

module.exports = infoRouter;