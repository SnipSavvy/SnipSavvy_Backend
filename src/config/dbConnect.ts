const mongoose = require("mongoose");
import logger from "../utils/logger";
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      autoIndex: true,
    });
    logger.info("DB connected successfully!");
  } catch (error: any) {
    logger.error(`${error.message}`);
  }
};

module.exports = dbConnect;
