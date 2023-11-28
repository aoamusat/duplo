const { Router } = require("express");
const { authenticate } = require("../services/auth/account");
const {
   apiIndex,
   getBusinessCreditScore,
   getOrderDetails,
   createOrder,
} = require("../controllers/api.controller");

const APIRouter = Router();

APIRouter.get("/", authenticate, apiIndex);
APIRouter.get("/credit-score", authenticate, getBusinessCreditScore);
APIRouter.get("/orders", authenticate, getOrderDetails);
APIRouter.post("/orders", authenticate, createOrder);

module.exports = APIRouter;
