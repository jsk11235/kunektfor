const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const axios = require("axios");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.post("/getPrice", async (req, res) => {
  const { tickerSymbol } = req.body;
  const result = await axios.get(
    `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${tickerSymbol}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`
  );

  const closePrices =
    result.data.spark.result[0].response[0].indicators.quote[0].close;
  res.json(closePrices[closePrices.length - 1]);
});
app.listen(port, () => console.log("rdy"));