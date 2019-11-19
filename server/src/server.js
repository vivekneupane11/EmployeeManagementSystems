import express from "express";
import dotenv from "dotenv";
dotenv.config();
//Local packages
import allendpoints from "./All Routes/allendpoint.routes";
const server = express();
//all-end-points
server.use(allendpoints);
server.listen(process.env.PORT, () => {
  console.log(`Server up and running at port : ${process.env.PORT}`);
});
