const express = require("express");
const LargeCap = require("../services/largeCap");
const calculateDynamicAllocation = require("../services/mutualFundAllocation");
const mutualFundRouter = express.Router();


mutualFundRouter.get("/api/v1/mutual-fund/best-large-cap", LargeCap)
mutualFundRouter.post("/api/v1/mutual-fund-investment-calculator", calculateDynamicAllocation)

module.exports = mutualFundRouter;