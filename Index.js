require("dotenv").config();
const path = require("path");

const { client } = require("./db");
client.connect();
const express = require("express");
const PORT = 3000;
const server = express();

server.use(express.json());

server.use(express.static(path.join(__dirname, "./client", "dist")));

server.get("/add/:first/to/:second", (req, res, next) => {
  res.send(
    `<h1>${req.params.first} + ${req.params.second} = ${
      Number(req.params.first) + Number(req.params.second)
    }</h1>`
  );
});

const morgan = require("morgan");
server.use(morgan("dev"));

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
