import "dotenv/config";

import compression from "compression";
import cors from "cors";
/*

Copyright (c) 2019 - present AppSeed.us

*/
import express from "express";
import passport from "passport";

import initPassport from "../config/passport";
import routes from "../routes/users";
import customers from "../routes/customers";
import employees from "../routes/employees";
import inventory from "../routes/inventory";
import machines from "../routes/machines";
import orders from "../routes/orders";
import orderDetails from "../routes/orderDetails";
import products from "../routes/products";
import productions from "../routes/productions";
import productionEmployee from "../routes/productionEmployee";
import purchaseOrder from "../routes/purchaseOrder";
import stockFabric from "../routes/stockFabric";
import stockYarn from "../routes/stockYarn";
import supplier from "../routes/supplier";
import payment from "../routes/payment";
import paymentMethod from "../routes/paymentMethod";
import paymentStatus from "../routes/paymentStatus";

import { connect } from "./database";

// Instantiate express
const server = express();
server.use(compression());

// Passport Config
initPassport(passport);
server.use(passport.initialize());

// Connect to sqlite
if (process.env.NODE_ENV !== "test") {
  connect();
}

server.use(cors());
server.use(express.json());

// Initialize routes middleware
server.use("/api/users", routes);
server.use("/api/customers", customers);
server.use("/api/employees", employees);
server.use("/api/inventory", inventory);
server.use("/api/machines", machines);
server.use("/api/orders", orders);
server.use("/api/orderdetails", orderDetails);
server.use("/api/products", products);
server.use("/api/productions", productions);
server.use("/api/productionEmployee", productionEmployee);
server.use("/api/purchaseOrder", purchaseOrder);
server.use("/api/stockFabric", stockFabric);
server.use("/api/stockYarn", stockYarn);
server.use("/api/supplier", supplier);
server.use("/api/payment", payment);
server.use("/api/paymentMethod", paymentMethod);
server.use("/api/paymentStatus", paymentStatus);

export default server;
