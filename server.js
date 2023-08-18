import express from "express";
import CloudFlareService from "./routes/CloudFlareService.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/middleware.js";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
dotenv.config();
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("CloudFlareService V1");
});

app.use("/resources/cloudflare/stream/", CloudFlareService);
app.options("/*", (req, res) => {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Max-Age": "3600",
  };
  res.writeHead(204, headers);
  res.send("");
});
app.listen(process.env.PORT || 3000, () => {});
