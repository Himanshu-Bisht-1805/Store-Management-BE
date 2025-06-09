import express from "express";
import cors from "cors";
import morgan from "morgan";
import { v1APIRouter } from "./routes/v1/private.js";
import { controlHeaders } from "./middlewares/headers.js";
import { errorConverter, errorHandler } from "./middlewares/error.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(errorConverter);
app.use(errorHandler);

app.use(
  "/v1/api",
  (req, res, next) => {
    console.log(1111), next();
  },
  controlHeaders,
  v1APIRouter
);

export default app;
