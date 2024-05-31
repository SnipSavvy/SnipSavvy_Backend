const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnect");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8001;
const workspace = require("./Routes/workspace.route");
const categoryRouter = require("./Routes/category.route");
const snippet = require("./Routes/snippet.route");
const Share = require("./Routes/share.route");
const user = require("./Routes/user.route");
dotenv.config();

import { Request,Response } from "express";
import logger from "./utils/logger";
db();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/v1/api/workspace", workspace);
app.use("/v1/api/category", categoryRouter);
app.use("/v1/api/snippet", snippet);
app.use("/v1/api/share", Share);
app.use("/v1/api/user", user);

app.get("/serverUp", async(req:Request,res:Response)=>{
  try {
    res.status(200).json({msg:"Server is awake!"})
  } catch (error:any) {
    res.status(500).json({error})
  }
});

app.listen(PORT, () => {
  logger.info(`Server has started and running on port ${PORT}`);
});
