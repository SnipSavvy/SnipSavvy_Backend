import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { JWT_SECRET } from "../config/jwt";

const jwt = require("jsonwebtoken");

interface AuthRequest extends Request {
  user_id?: string;
}

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "Invalid header",
    });
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { user_id: string };
    console.log(payload);

    const user = await User.findOne({ _id: payload.user_id });
    if (!user) {
      return res.status(403).json({
        msg: "Invalid Request! user not found in the token",
      });
    }

    req.user_id = payload.user_id;
    next();
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
};
module.exports = authMiddleware;
