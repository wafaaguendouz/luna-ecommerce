import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import subdomain from "express-subdomain";
import cors from 'cors';
import morgan from "morgan";
import httpProxy from "http-proxy";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

//import products from './data/products.js'
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import shopRouter from "./shopRouter.js";

dotenv.config();
connectDB();
///https?:\/\/([a-z]+.)?lunacommerce\.xyz/i
const app = express();

// Add headers
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  const hostname = "lunacommerce.test";
  const sslKey = "localurl.key";
  const sslCrt = "localurl.crt";

  const proxy = httpProxy
    .createProxyServer({
      target: { host: hostname, port: 5000 },
    })
    .listen(80);

  const secureProxy = httpProxy
    .createProxyServer({
      target: { host: hostname, port: 5000 },
      ssl: {
        key: fs.readFileSync(sslKey, "utf8"),
        cert: fs.readFileSync(sslCrt, "utf8"),
      },
      secure: true,
    })
    .listen(443);

  // Listen for the `error` event on `proxy`.
  proxy.on("error", function (err, req, res) {
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });

    console.log(" Error ", err);
    res.end(
      "Something went wrong. And we are reporting a custom error message." + err
    );
  });

  // Listen for the `error` event on `proxy`.
  secureProxy.on("error", function (err, req, res) {
    res.writeHead(500, {
      "Content-Type": "text/plain",
    });

    res.end(
      "Something went wrong. And we are reporting a custom error message." + err
    );
  });
}

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(subdomain("api", router));
app.use(subdomain("*", shopRouter));



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
