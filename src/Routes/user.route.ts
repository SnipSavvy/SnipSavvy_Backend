const authMiddleware = require("../middlewares/auth.middleware");

import express, { Router } from "express";
import { register } from "../controllers/user.controller";
const user: Router = express.Router();

user.post("/", register);

module.exports = user;
