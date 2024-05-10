import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { JWT_SECRET } from "../config/jwt";

const jwt = require("jsonwebtoken");

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization; // take authorisation from headers

  if (!header || !header.startsWith("Bearer ")) {
    // checking for the presence and valid syntax of token
    return res.status(403).json({
      msg: "Invalid header",
    });
  }

  const token = header.split(" ")[1]; // taking out token

  try {
    const payload = await jwt.verify(token, JWT_SECRET); //extracting payload from the token
    console.log(payload);

    const user = await User.find({ _id: payload.userId });
    if (!user) {
      return res.status(403).json({
        msg: "Invalid Request! user not found in the token",
      });
    }

    req.userId = payload.userId; // inserting userId directly into the req
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
};
module.exports = authMiddleware;
