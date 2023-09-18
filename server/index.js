import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import productRoutes from "./routes/product.js";
import Product from "./models/Product.js";
import { kpis, products } from "./data/data.js";

/** CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/** ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);

/** MONGOOSE */
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

    /** Seed data as needed */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
  })
  .catch((error) => console.warn(`${error} could not connect`));
