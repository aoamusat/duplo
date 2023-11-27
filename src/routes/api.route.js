const { Router } = require("express");
const { authenticate } = require("../services/auth/account");
const {
   apiIndex,
   getBusinessCreditScore,
} = require("../controllers/api.controller");

const APIRouter = Router();

APIRouter.get("/", apiIndex);
APIRouter.get("/credit-score", authenticate, getBusinessCreditScore);

module.exports = APIRouter;
