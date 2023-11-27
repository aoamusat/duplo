const { Router } = require("express");
const { authenticate } = require("../services/auth/account");
const {
   apiIndex,
   getBusinessCreditScore,
   getOrderDetails,
} = require("../controllers/api.controller");

const APIRouter = Router();

APIRouter.get("/", authenticate, apiIndex);
APIRouter.get("/credit-score", authenticate, getBusinessCreditScore);
APIRouter.get("/orders", authenticate, getOrderDetails);

module.exports = APIRouter;
