const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios").default;

const app = express();

const router = express.Router();

app.use(bodyParser.json());
app.use(cors());

router.post("/", async (req, res) => {
  const user = req.body.user;
  const URL = `https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws?player=${user}`;
  try {
    const response = await axios({
      url: URL,
      method: "GET",
    });

    res.json({ result: response.data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the data" });
  }
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
