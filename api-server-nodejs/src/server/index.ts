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
import orderDetails from "../routes/orderdetails";
import products from "../routes/products";
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

export default server;
