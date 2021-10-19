import express from "express";
import listEndpoints from "express-list-endpoints";

const server = express()

const port = 3002

server.listen(port, () => {
    console.log("Server running on port:", port)
  })