const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/dbConnect");
const app = express();
const cors = require("cors");
const PORT = 8001;
import logger from "./utils/logger";
const workspace = require("./Routes/workspace.route");
const categoryRouter = require("./Routes/category.route");
const snippet = require("./Routes/snippet.route");
const Share = require("./Routes/share.route");
dotenv.config();

db();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/v1/api/workspace", workspace);
app.use("/vi/api/category", categoryRouter);
app.use("/v1/api/snippet", snippet);
app.use("/v1/api/share", Share);

app.listen(PORT, () => {
  logger.info(`Server has started and running on port ${PORT}`);
});
