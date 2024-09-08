const express = require("express");
const cors = require("cors");
const app = express();

const port = 8000;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  console.log("inside a Home");
  return res.status(200).send({
    message: "sended",
  });
});
const arr = [];

app.post("/", async (req, res) => {
  console.log(req.body);
  arr.push(req.body);
  console.log("data received");
  console.log(arr);
  return res.status(201).send({
    message: "to do created successfully",
  });
});

app.listen(port, () => {
  console.log("server is running");
});