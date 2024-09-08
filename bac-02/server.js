const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const fs = require('node:fs/promises');

//middleware
app.use(express.json()); //parsing the body data from client side
app.use(cors());
app.use(morgan("combined"));
dotenv.config({ path: ".env" });

//Routes
let arr = []; //{id:1,anme:vikas,todo}

app.post("/", async (req, res) => {
  try {


    //file reackro
    const { id, name, todo } = req.body;
    console.log(name, todo);
     console.log(__dirname)
     fs.appendFile(__dirname+"/file.txt",JSON.stringify({ id: id, name: name, todo: todo })+'\n',function (err) {
        if (err) throw err;
        console.log('Saved!')})
    arr.push({ id: id, name: name, todo: todo });

    console.log(arr);

    return res.status(201).send({
      message: "todo created",
    });
  } catch (error) {}
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = arr.filter((value) => {
      return value.id == id;
    });

    console.log(data);
    if (data.length == 0) {
      return res.status(400).send({
        message: "todo not found",
      });
    }
    return res.status(200).send({
      message: "Todo Found",
      data: data,
    });
  } catch (error) {}
});
app.delete("/:id", (req, res) => {
  try {
    console.log(arr);

    const { id } = req.params;
    arr = arr.filter((value) => value.id != id);
    console.log(arr);
    return res.status(200).send({
      message: "todo deleted successfully",
      data: arr,
    });
  } catch (error) {}
});

app.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log(data);
    arr=arr.map((value) => {
      if (value.id == id) {
        return { ...value, name: data.name, todo: data.todo };
      }
      return value;
    });
    console.log(arr);
    return res.status(200).send({
      message: "data udatated successfully",
      data: arr,
    });
  } catch (error) {
    console.log(error);
  }
});

//server
app.listen(process.env.port, () => {
  console.log("Server Running on Port 8000");
});
