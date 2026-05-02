const axios = require("axios");
require("dotenv").config();
const LOG_API = "http://20.207.122.201/evaluation-service/logs";
const TOKEN = process.env.TOKEN;
const Log = async (stack, level, packageName, message) => {
  try {
    const response = await axios.post(
      LOG_API,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Log sent:", response.data);
  } catch (error) {
    console.error("Logging failed:", error.response?.data || error.message);
  }
};

module.exports = Log;