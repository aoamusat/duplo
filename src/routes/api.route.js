const { Router } = require("express");
const { authenticate } = require("../services/auth/account");
const { apiIndex } = require("../controllers/api.controller");

const APIRouter = Router();

APIRouter.get("/", apiIndex);

// APIRouter.get("/contracts/:id", authenticate, getContract);
// APIRouter.get("/contracts", authenticate, allContracts);

module.exports = APIRouter;
